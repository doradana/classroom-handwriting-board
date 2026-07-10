from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote_plus, urlparse
import base64
import hashlib
import hmac
import json
import os
import re
import secrets
import sys
import uuid
from datetime import datetime, timezone


ROOT = Path(__file__).resolve().parent


def default_data_root():
    env_path = os.environ.get("CLASSROOM_DATA_DIR") or os.environ.get("DATA_DIR")
    if env_path:
        return Path(env_path).expanduser()
    render_disk = Path("/var/data")
    if render_disk.exists():
        return render_disk
    return ROOT / "data"


DATA_ROOT = default_data_root()
DATA_DIR = DATA_ROOT / "rooms"
TEACHERS_FILE = DATA_ROOT / "teachers.json"
SESSION_SECRET_FILE = DATA_ROOT / "session-secret.txt"
LEGACY_DATA_ROOT = ROOT / "data"
MAX_BODY_BYTES = 4 * 1024 * 1024
ROOM_RE = re.compile(r"^[0-9]{4,8}$")
COURSE_CODE_RE = re.compile(r"^[0-9]{6}$")
COURSE_RE = re.compile(r"^[a-zA-Z0-9_-]{1,64}$")
USERNAME_RE = re.compile(r"^[A-Za-z0-9_.@-]{3,60}$")
DEFAULT_COURSE_ID = "default"


def ensure_data_root():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_ROOT.mkdir(parents=True, exist_ok=True)


def migrate_legacy_data():
    if DATA_ROOT.resolve() == LEGACY_DATA_ROOT.resolve() or not LEGACY_DATA_ROOT.exists():
        return
    ensure_data_root()
    legacy_teachers = LEGACY_DATA_ROOT / "teachers.json"
    if legacy_teachers.exists() and not TEACHERS_FILE.exists():
        TEACHERS_FILE.write_bytes(legacy_teachers.read_bytes())
    legacy_secret = LEGACY_DATA_ROOT / "session-secret.txt"
    if legacy_secret.exists() and not SESSION_SECRET_FILE.exists():
        SESSION_SECRET_FILE.write_bytes(legacy_secret.read_bytes())
    legacy_rooms = LEGACY_DATA_ROOT / "rooms"
    if legacy_rooms.exists():
        for legacy_room in legacy_rooms.glob("*.json"):
            target = DATA_DIR / legacy_room.name
            if not target.exists():
                target.write_bytes(legacy_room.read_bytes())


def storage_status():
    ensure_data_root()
    return {
        "dataRoot": str(DATA_ROOT),
        "roomsDir": str(DATA_DIR),
        "persistent": str(DATA_ROOT).replace("\\", "/").startswith("/var/data"),
        "rooms": len(list(DATA_DIR.glob("*.json"))),
        "teachersFile": TEACHERS_FILE.exists(),
    }


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def load_teachers():
    try:
        data = json.loads(TEACHERS_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        data = {"teachers": []}
    if not isinstance(data, dict) or not isinstance(data.get("teachers"), list):
        return {"teachers": []}
    return data


def save_teachers(data):
    TEACHERS_FILE.parent.mkdir(parents=True, exist_ok=True)
    temp_file = TEACHERS_FILE.with_suffix(".tmp")
    temp_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    temp_file.replace(TEACHERS_FILE)


def session_secret():
    SESSION_SECRET_FILE.parent.mkdir(parents=True, exist_ok=True)
    if SESSION_SECRET_FILE.exists():
        secret = SESSION_SECRET_FILE.read_text(encoding="utf-8").strip()
        if secret:
            return secret
    secret = secrets.token_hex(32)
    SESSION_SECRET_FILE.write_text(secret, encoding="utf-8")
    return secret


def password_hash(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 180000)
    return salt, digest.hex()


def public_teacher(teacher):
    return {
        "id": teacher.get("id", ""),
        "name": teacher.get("name", ""),
        "username": teacher.get("username", ""),
    }


def find_teacher(username):
    username = str(username or "").strip().lower()
    for teacher in load_teachers()["teachers"]:
        if str(teacher.get("username", "")).lower() == username:
            return teacher
    return None


def create_teacher(payload):
    username = str(payload.get("username", "")).strip().lower()
    name = str(payload.get("name", "")).strip()[:40]
    password = str(payload.get("password", ""))
    if not USERNAME_RE.match(username):
        return None, "Username must be 3 to 60 letters, numbers, or email symbols"
    if len(password) < 6:
        return None, "Password must be at least 6 characters"
    data = load_teachers()
    if any(str(teacher.get("username", "")).lower() == username for teacher in data["teachers"]):
        return None, "This account already exists"
    salt, digest = password_hash(password)
    teacher = {
        "id": uuid.uuid4().hex,
        "username": username,
        "name": name or username,
        "salt": salt,
        "passwordHash": digest,
        "createdAt": now_iso(),
    }
    data["teachers"].append(teacher)
    save_teachers(data)
    return teacher, None


def login_teacher(payload):
    teacher = find_teacher(payload.get("username"))
    password = str(payload.get("password", ""))
    if not teacher or not password:
        return None, "Invalid account or password"
    _, digest = password_hash(password, teacher.get("salt", ""))
    if not hmac.compare_digest(digest, teacher.get("passwordHash", "")):
        return None, "Invalid account or password"
    return teacher, None


def reset_teacher_password(payload):
    username = str(payload.get("username", "")).strip().lower()
    name = str(payload.get("name", "")).strip()
    password = str(payload.get("password", ""))
    if not USERNAME_RE.match(username) or len(password) < 6:
        return None, "Invalid reset request"
    data = load_teachers()
    teacher = None
    for item in data["teachers"]:
        if str(item.get("username", "")).lower() == username:
            teacher = item
            break
    if not teacher:
        return None, "Invalid reset request"
    if name:
        teacher["name"] = name[:40]
    salt, digest = password_hash(password)
    teacher["salt"] = salt
    teacher["passwordHash"] = digest
    teacher["passwordUpdatedAt"] = now_iso()
    save_teachers(data)
    return teacher, None


def issue_session(teacher):
    teacher_id = teacher["id"]
    signature = hmac.new(session_secret().encode("utf-8"), teacher_id.encode("utf-8"), hashlib.sha256).hexdigest()
    raw = f"{teacher_id}.{signature}".encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("utf-8").rstrip("=")


def current_teacher(handler):
    token = handler.headers.get("X-Teacher-Token", "").strip()
    auth = handler.headers.get("Authorization", "").strip()
    if not token and auth.lower().startswith("bearer "):
        token = auth[7:].strip()
    if not token:
        return None
    try:
        padded = token + "=" * (-len(token) % 4)
        raw = base64.urlsafe_b64decode(padded.encode("utf-8")).decode("utf-8")
        teacher_id, signature = raw.split(".", 1)
    except (ValueError, UnicodeDecodeError):
        return None
    expected = hmac.new(session_secret().encode("utf-8"), teacher_id.encode("utf-8"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return None
    for teacher in load_teachers()["teachers"]:
        if teacher.get("id") == teacher_id:
            return teacher
    return None


def room_file(room_code):
    if not ROOM_RE.match(room_code):
        return None
    return DATA_DIR / f"{room_code}.json"


def room_exists(room_code):
    path = room_file(room_code)
    return path is not None and path.exists()


def generate_room_code():
    for _ in range(200):
        code = str(uuid.uuid4().int % 100000000).zfill(8)[:8]
        if code != "00000000" and not room_exists(code):
            return code
    raise RuntimeError("Could not generate an unused room code")


def generate_course_code():
    for _ in range(200):
        code = str(100000 + (uuid.uuid4().int % 900000))
        if code != "00000000" and not course_code_in_use(code):
            return code
    raise RuntimeError("Could not generate an unused course code")


def default_room(room_code):
    return {
        "room": room_code,
        "name": "",
        "teacher": {},
        "teacherId": "",
        "courses": [
            {
                "id": DEFAULT_COURSE_ID,
                "name": "預設課程",
                "code": "",
                "createdAt": now_iso(),
            }
        ],
        "activeCourseId": DEFAULT_COURSE_ID,
        "postsByCourse": {DEFAULT_COURSE_ID: []},
    }


def normalize_room(room_code, data):
    if isinstance(data, list):
        room = default_room(room_code)
        room["postsByCourse"][DEFAULT_COURSE_ID] = data
        return room

    if not isinstance(data, dict):
        return default_room(room_code)

    room = default_room(room_code)
    room.update({key: data.get(key, room[key]) for key in room.keys() if key in data})

    if not isinstance(room.get("teacher"), dict):
        room["teacher"] = {}
    room["name"] = sanitize_room_name(room.get("name"))
    room["teacherId"] = str(room.get("teacherId") or "")
    if not isinstance(room.get("courses"), list) or not room["courses"]:
        room["courses"] = default_room(room_code)["courses"]
    if not isinstance(room.get("postsByCourse"), dict):
        room["postsByCourse"] = {DEFAULT_COURSE_ID: []}

    clean_courses = []
    seen = set()
    for course in room["courses"]:
        if not isinstance(course, dict):
            continue
        course_id = str(course.get("id", "")).strip()
        if not COURSE_RE.match(course_id) or course_id in seen:
            continue
        name = str(course.get("name", "")).strip()[:40] or "未命名課程"
        course_code = sanitize_course_code(course.get("code"))
        clean_courses.append(
            {
                "id": course_id,
                "name": name,
                "code": course_code,
                "createdAt": str(course.get("createdAt") or now_iso()),
            }
        )
        seen.add(course_id)
        room["postsByCourse"].setdefault(course_id, [])

    if not clean_courses:
        clean_courses = default_room(room_code)["courses"]
        room["postsByCourse"].setdefault(DEFAULT_COURSE_ID, [])

    room["courses"] = clean_courses
    if room.get("activeCourseId") not in {course["id"] for course in clean_courses}:
        room["activeCourseId"] = clean_courses[0]["id"]

    for course_id, posts in list(room["postsByCourse"].items()):
        if not isinstance(posts, list):
            room["postsByCourse"][course_id] = []

    return room


def ensure_unique_course_codes(room_code, room):
    changed = False
    seen_codes = set()
    for course in room.get("courses", []):
        course_id = str(course.get("id", "")).strip()
        course_code = sanitize_course_code(course.get("code"))
        if (
            not course_code
            or course_code in seen_codes
            or course_code_in_use(course_code, room_code, course_id)
        ):
            course_code = generate_course_code()
            course["code"] = course_code
            changed = True
        seen_codes.add(course_code)
    return changed


def load_room(room_code):
    path = room_file(room_code)
    if path is None or not path.exists():
        room = default_room(room_code)
        ensure_unique_course_codes(room_code, room)
        return room
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        data = {}
    room = normalize_room(room_code, data)
    if ensure_unique_course_codes(room_code, room):
        save_room(room_code, room)
    return room


def load_room_raw(room_code):
    path = room_file(room_code)
    if path is None or not path.exists():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}
    return data if isinstance(data, dict) else {}


def save_room(room_code, room):
    path = room_file(room_code)
    if path is None:
        raise ValueError("Invalid room code")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temp_file = path.with_suffix(".tmp")
    temp_file.write_text(json.dumps(room, ensure_ascii=False, indent=2), encoding="utf-8")
    temp_file.replace(path)


def rotate_room_code(room_code):
    old_path = room_file(room_code)
    if old_path is None or not old_path.exists():
        return None
    new_code = generate_room_code()
    room = load_room(room_code)
    history = room.get("passwordHistory")
    if not isinstance(history, list):
        history = []
    history.append({"code": room_code, "endedAt": now_iso()})
    room["passwordHistory"] = history[-20:]
    room["room"] = new_code
    room["lastRotatedAt"] = now_iso()
    save_room(new_code, room)
    old_path.unlink(missing_ok=True)
    return room


def rotate_active_course_code(room_code):
    if not room_exists(room_code):
        return None
    room = load_room(room_code)
    active_course_id = room.get("activeCourseId", DEFAULT_COURSE_ID)
    course = next((item for item in room.get("courses", []) if item.get("id") == active_course_id), None)
    if not course and room.get("courses"):
        course = room["courses"][0]
        room["activeCourseId"] = course["id"]
    if not course:
        return None
    history = course.get("passwordHistory")
    if not isinstance(history, list):
        history = []
    old_code = sanitize_course_code(course.get("code"))
    if old_code:
        history.append({"code": old_code, "endedAt": now_iso()})
    course["passwordHistory"] = history[-20:]
    course["code"] = generate_course_code()
    room["lastRotatedAt"] = now_iso()
    save_room(room_code, room)
    return room


def ensure_room(room_code, teacher=None):
    room = load_room(room_code)
    if teacher:
        room["teacher"] = sanitize_teacher(public_teacher(teacher))
        room["teacherId"] = teacher.get("id", "")
    save_room(room_code, room)
    return room


def sanitize_teacher(value):
    if not isinstance(value, dict):
        return {}
    return {
        "name": str(value.get("name", "")).strip()[:40],
        "email": str(value.get("email", "")).strip()[:80],
        "picture": str(value.get("picture", "")).strip()[:300],
    }


def sanitize_course_name(value):
    return str(value or "").strip()[:40] or "未命名課程"


def sanitize_course_code(value):
    value = str(value or "").strip()
    return value if COURSE_CODE_RE.match(value) else ""


def sanitize_room_name(value):
    return str(value or "").strip()[:32]


def read_json(handler):
    content_length = int(handler.headers.get("Content-Length", "0"))
    if content_length <= 0:
        return {}
    if content_length > MAX_BODY_BYTES:
        return None
    try:
        return json.loads(handler.rfile.read(content_length).decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None


def json_response(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def room_summary(room):
    return {
        "room": room["room"],
        "name": room.get("name", ""),
        "exists": True,
        "teacher": room.get("teacher", {}),
        "courses": room.get("courses", []),
        "activeCourseId": room.get("activeCourseId", DEFAULT_COURSE_ID),
    }


def parse_room_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})", path)
    return match.group(1) if match else None


def parse_create_room_path(path):
    return path == "/api/rooms"


def parse_course_lookup_path(path):
    match = re.fullmatch(r"/api/courses/by-code/([0-9]{6})", path)
    return match.group(1) if match else None


def parse_courses_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses", path)
    return match.group(1) if match else None


def parse_course_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses/([a-zA-Z0-9_-]{1,64})", path)
    return match.groups() if match else None


def parse_rotate_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/rotate", path)
    return match.group(1) if match else None


def parse_course_posts_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses/([a-zA-Z0-9_-]{1,64})/posts", path)
    return match.groups() if match else None


def parse_single_post_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses/([a-zA-Z0-9_-]{1,64})/posts/([a-zA-Z0-9_-]{1,80})", path)
    return match.groups() if match else None


def room_belongs_to_teacher(room, teacher):
    teacher_id = str(teacher.get("id") or "")
    username = str(teacher.get("username") or "").strip().lower()
    room_teacher_id = str(room.get("teacherId") or "")
    room_username = str((room.get("teacher") or {}).get("username") or "").strip().lower()
    if room_teacher_id and room_teacher_id == teacher_id:
        return True
    if username and room_username and room_username == username:
        return True
    return not room_username


def relink_room_teacher(room_code, room, teacher):
    changed = False
    public = sanitize_teacher(public_teacher(teacher))
    if room.get("teacherId") != teacher.get("id"):
        room["teacherId"] = teacher.get("id", "")
        changed = True
    if room.get("teacher") != public:
        room["teacher"] = public
        changed = True
    if changed:
        save_room(room_code, room)


def teacher_history(teacher):
    ensure_data_root()
    rooms = []
    for path in DATA_DIR.glob("*.json"):
        room_code = path.stem
        if not ROOM_RE.match(room_code):
            continue
        room = load_room(room_code)
        if not room_belongs_to_teacher(room, teacher):
            continue
        relink_room_teacher(room_code, room, teacher)
        courses = room.get("courses", [])
        post_times = []
        total_posts = 0
        for posts in room.get("postsByCourse", {}).values():
            if not isinstance(posts, list):
                continue
            total_posts += len(posts)
            post_times.extend(str(post.get("createdAt", "")) for post in posts if isinstance(post, dict))
        updated_candidates = [course.get("createdAt", "") for course in courses]
        updated_candidates.extend(post_times)
        updated_candidates.append(room.get("lastRotatedAt", ""))
        rooms.append(
            {
                "room": room_code,
                "name": room.get("name", ""),
                "courses": courses,
                "activeCourseId": room.get("activeCourseId", DEFAULT_COURSE_ID),
                "totalPosts": total_posts,
                "updatedAt": max(updated_candidates),
            }
        )
    rooms.sort(key=lambda item: item.get("updatedAt", ""), reverse=True)
    return rooms


def find_course_by_code(course_code):
    course_code = sanitize_course_code(course_code)
    if not course_code:
        return None, None
    ensure_data_root()
    for path in DATA_DIR.glob("*.json"):
        room_code = path.stem
        if not ROOM_RE.match(room_code):
            continue
        room = load_room(room_code)
        for course in room.get("courses", []):
            if sanitize_course_code(course.get("code")) == course_code:
                return room, course
    return None, None


def course_code_in_use(course_code, allow_room_code=None, allow_course_id=None):
    course_code = sanitize_course_code(course_code)
    if not course_code:
        return False
    ensure_data_root()
    for path in DATA_DIR.glob("*.json"):
        room_code = path.stem
        if not ROOM_RE.match(room_code):
            continue
        data = load_room_raw(room_code)
        courses = data.get("courses", [])
        if not isinstance(courses, list):
            continue
        for course in courses:
            if not isinstance(course, dict):
                continue
            if sanitize_course_code(course.get("code")) != course_code:
                continue
            if room_code == allow_room_code and str(course.get("id", "")) == str(allow_course_id or ""):
                continue
            return True
    return False


def require_teacher(handler):
    teacher = current_teacher(handler)
    if not teacher:
        json_response(handler, 401, {"error": "Teacher login required"})
        return None
    return teacher


def require_room_owner(handler, room_code):
    teacher = require_teacher(handler)
    if not teacher:
        return None, None
    if not room_exists(room_code):
        json_response(handler, 404, {"error": "Room not found"})
        return None, None
    room = load_room(room_code)
    if not room_belongs_to_teacher(room, teacher):
        json_response(handler, 403, {"error": "This room belongs to another teacher"})
        return None, None
    relink_room_teacher(room_code, room, teacher)
    return teacher, room


class ClassroomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        return

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        if not urlparse(self.path).path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == "/api/teacher/me":
            teacher = require_teacher(self)
            if not teacher:
                return
            json_response(self, 200, {"teacher": public_teacher(teacher)})
            return

        if path == "/api/teacher/history":
            teacher = require_teacher(self)
            if not teacher:
                return
            json_response(self, 200, {"rooms": teacher_history(teacher)})
            return

        if path == "/api/storage/status":
            teacher = require_teacher(self)
            if not teacher:
                return
            json_response(self, 200, storage_status())
            return

        course_code = parse_course_lookup_path(path)
        if course_code:
            room, course = find_course_by_code(course_code)
            if not room or not course:
                json_response(self, 404, {"error": "Course not found"})
                return
            summary = room_summary(room)
            summary["activeCourseId"] = course["id"]
            summary["joinedCourseCode"] = course_code
            json_response(self, 200, summary)
            return

        room_code = parse_room_path(path)
        if room_code:
            if not room_exists(room_code):
                json_response(self, 200, {"room": room_code, "exists": False})
                return
            json_response(self, 200, room_summary(load_room(room_code)))
            return

        room_code = parse_courses_path(path)
        if room_code:
            if not room_exists(room_code):
                json_response(self, 404, {"error": "Room not found"})
                return
            room = load_room(room_code)
            json_response(self, 200, {"courses": room["courses"], "activeCourseId": room["activeCourseId"]})
            return

        parsed = parse_course_posts_path(path)
        if parsed:
            room_code, course_id = parsed
            if not room_exists(room_code):
                json_response(self, 404, {"error": "Room not found"})
                return
            room = load_room(room_code)
            if course_id not in room["postsByCourse"]:
                json_response(self, 404, {"error": "Course not found"})
                return
            student_name = unquote_plus(parse_qs(parsed_url.query).get("student", [""])[0]).strip()[:18]
            course_posts = room["postsByCourse"][course_id]
            if student_name:
                course_posts = [post for post in course_posts if str(post.get("name", "")).strip() == student_name]
            else:
                teacher, _room = require_room_owner(self, room_code)
                if not teacher:
                    return
            json_response(self, 200, course_posts)
            return

        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path

        if path in {"/api/teacher/register", "/api/teacher/login"}:
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            if path.endswith("/register"):
                teacher, error = create_teacher(payload)
            else:
                teacher, error = login_teacher(payload)
            if error:
                json_response(self, 401 if path.endswith("/login") else 400, {"error": error})
                return
            json_response(self, 200, {"token": issue_session(teacher), "teacher": public_teacher(teacher)})
            return

        if path == "/api/teacher/reset-password":
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            teacher, error = reset_teacher_password(payload)
            if error:
                json_response(self, 400, {"error": error})
                return
            json_response(self, 200, {"token": issue_session(teacher), "teacher": public_teacher(teacher)})
            return

        if parse_create_room_path(path):
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            if payload.get("role") != "teacher":
                json_response(self, 403, {"error": "Only teachers can create rooms"})
                return
            teacher = require_teacher(self)
            if not teacher:
                return
            room_code = generate_room_code()
            room = ensure_room(room_code, teacher)
            room["name"] = sanitize_room_name(payload.get("name")) or "Default room"
            room["courses"][0]["name"] = sanitize_course_name(payload.get("courseName")) or room["courses"][0]["name"]
            room["courses"][0]["code"] = generate_course_code()
            save_room(room_code, room)
            json_response(self, 200, room_summary(room))
            return

        room_code = parse_room_path(path)
        if room_code:
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            if payload.get("role") != "teacher":
                json_response(self, 403, {"error": "Only teachers can create rooms"})
                return
            teacher = require_teacher(self)
            if not teacher:
                return
            if room_exists(room_code):
                existing_room = load_room(room_code)
                if existing_room.get("teacherId") and existing_room.get("teacherId") != teacher.get("id"):
                    json_response(self, 403, {"error": "This room belongs to another teacher"})
                    return
            room = ensure_room(room_code, teacher)
            room_name = sanitize_room_name(payload.get("name"))
            if room_name:
                room["name"] = room_name
            course_code = sanitize_course_code(payload.get("courseCode") or room_code)
            if course_code and room["courses"]:
                if course_code_in_use(course_code, room_code, room["courses"][0].get("id")):
                    json_response(self, 409, {"error": "Course code already exists"})
                    return
                room["courses"][0]["code"] = course_code
                save_room(room_code, room)
            json_response(self, 200, room_summary(room))
            return

        room_code = parse_rotate_path(path)
        if room_code:
            teacher, _room = require_room_owner(self, room_code)
            if not teacher:
                return
            room = rotate_active_course_code(room_code)
            json_response(self, 200, room_summary(room))
            return

        room_code = parse_courses_path(path)
        if room_code:
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            course = {
                "id": uuid.uuid4().hex[:12],
                "name": sanitize_course_name(payload.get("name")),
                "code": generate_course_code(),
                "createdAt": now_iso(),
            }
            room["courses"].append(course)
            room["activeCourseId"] = course["id"]
            room["postsByCourse"][course["id"]] = []
            save_room(room_code, room)
            json_response(self, 200, {"course": course, "courses": room["courses"], "activeCourseId": course["id"]})
            return

        parsed = parse_course_posts_path(path)
        if not parsed:
            json_response(self, 404, {"error": "Not found"})
            return

        room_code, course_id = parsed
        if not room_exists(room_code):
            json_response(self, 404, {"error": "Room not found"})
            return

        payload = read_json(self)
        if payload is None:
            json_response(self, 400, {"error": "Invalid JSON or upload is too large"})
            return

        room = load_room(room_code)
        if course_id not in room["postsByCourse"]:
            json_response(self, 404, {"error": "Course not found"})
            return

        name = str(payload.get("name", "")).strip()[:18]
        prompt = str(payload.get("prompt", "")).strip()[:32] or "中文手寫練習"
        image = str(payload.get("image", ""))
        if not name or not image.startswith("data:image/png;base64,"):
            json_response(self, 400, {"error": "Missing name or handwriting image"})
            return

        room["postsByCourse"][course_id].insert(
            0,
            {
                "id": str(uuid.uuid4()),
                "name": name,
                "prompt": prompt,
                "image": image,
                "courseId": course_id,
                "createdAt": now_iso(),
            },
        )
        save_room(room_code, room)
        own_posts = [post for post in room["postsByCourse"][course_id] if str(post.get("name", "")).strip() == name]
        json_response(self, 200, own_posts)

    def do_PATCH(self):
        path = urlparse(self.path).path
        room_code = parse_room_path(path)
        if room_code:
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            room["name"] = sanitize_room_name(payload.get("name"))
            save_room(room_code, room)
            json_response(self, 200, room_summary(room))
            return

        parsed = parse_course_path(path)
        if not parsed:
            json_response(self, 404, {"error": "Not found"})
            return
        room_code, course_id = parsed
        teacher, room = require_room_owner(self, room_code)
        if not teacher:
            return
        payload = read_json(self)
        if payload is None:
            json_response(self, 400, {"error": "Invalid JSON"})
            return
        for course in room["courses"]:
            if course.get("id") == course_id:
                course["name"] = sanitize_course_name(payload.get("name"))
                save_room(room_code, room)
                json_response(self, 200, {"course": course, "courses": room["courses"], "activeCourseId": room.get("activeCourseId", DEFAULT_COURSE_ID)})
                return
        json_response(self, 404, {"error": "Course not found"})

    def do_DELETE(self):
        path = urlparse(self.path).path
        room_code = parse_room_path(path)
        if room_code:
            teacher, _room = require_room_owner(self, room_code)
            if not teacher:
                return
            room_file(room_code).unlink(missing_ok=True)
            json_response(self, 200, {"deleted": True, "room": room_code})
            return

        single_post = parse_single_post_path(path)
        if single_post:
            room_code, course_id, post_id = single_post
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            if course_id not in room["postsByCourse"]:
                json_response(self, 404, {"error": "Course not found"})
                return
            before = len(room["postsByCourse"][course_id])
            room["postsByCourse"][course_id] = [
                post for post in room["postsByCourse"][course_id]
                if str(post.get("id", "")) != post_id
            ]
            if len(room["postsByCourse"][course_id]) == before:
                json_response(self, 404, {"error": "Post not found"})
                return
            save_room(room_code, room)
            json_response(self, 200, room["postsByCourse"][course_id])
            return

        course_target = parse_course_path(path)
        if course_target:
            room_code, course_id = course_target
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            existing_ids = {course.get("id") for course in room.get("courses", [])}
            if course_id not in existing_ids:
                json_response(self, 404, {"error": "Course not found"})
                return
            room["courses"] = [course for course in room["courses"] if course.get("id") != course_id]
            room["postsByCourse"].pop(course_id, None)
            if not room["courses"]:
                default_course = default_room(room_code)["courses"][0]
                room["courses"] = [default_course]
                room["postsByCourse"] = {default_course["id"]: []}
            active_course_id = room["activeCourseId"]
            if active_course_id == course_id or active_course_id not in {course.get("id") for course in room["courses"]}:
                active_course_id = room["courses"][0]["id"]
                room["activeCourseId"] = active_course_id
            room["postsByCourse"].setdefault(active_course_id, [])
            save_room(room_code, room)
            json_response(
                self,
                200,
                {
                    "deleted": True,
                    "courseId": course_id,
                    "courses": room["courses"],
                    "activeCourseId": active_course_id,
                    "posts": room["postsByCourse"][active_course_id],
                },
            )
            return

        parsed = parse_course_posts_path(path)
        if not parsed:
            json_response(self, 404, {"error": "Not found"})
            return
        room_code, course_id = parsed
        teacher, room = require_room_owner(self, room_code)
        if not teacher:
            return
        if course_id not in room["postsByCourse"]:
            json_response(self, 404, {"error": "Course not found"})
            return
        room["postsByCourse"][course_id] = []
        save_room(room_code, room)
        json_response(self, 200, [])


def main():
    migrate_legacy_data()
    log_path = ROOT / "server-runtime.log"
    sys.stdout = open(log_path, "a", encoding="utf-8", buffering=1)
    sys.stderr = sys.stdout
    host = "0.0.0.0"
    port = int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 8030))
    server = ThreadingHTTPServer((host, port), ClassroomHandler)
    print(f"Classroom handwriting board: http://127.0.0.1:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
