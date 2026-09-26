from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote_plus, urlparse
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import base64
import binascii
import hashlib
import hmac
from http.cookies import SimpleCookie
import json
import os
import re
import secrets
import sys
import threading
import time
import uuid
from datetime import datetime, timedelta, timezone


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
DELETED_ROOMS_FILE = DATA_ROOT / "deleted-rooms.json"
LEGACY_DATA_ROOT = ROOT / "data"
LEGACY_MIGRATION_ENABLED = os.environ.get("CLASSROOM_MIGRATE_LEGACY_DATA") == "1"
MAX_BODY_BYTES = 4 * 1024 * 1024
MAX_IMAGE_DATA_URL_BYTES = 3 * 1024 * 1024
MAX_POSTS_PER_COURSE = 200
SESSION_MAX_AGE = timedelta(days=14)
CSRF_COOKIE_NAME = "classroom_csrf"
ROOM_RE = re.compile(r"^[0-9]{4,8}$")
COURSE_CODE_RE = re.compile(r"^[0-9]{6}$")
COURSE_RE = re.compile(r"^[a-zA-Z0-9_-]{1,64}$")
USERNAME_RE = re.compile(r"^[A-Za-z0-9_.@-]{3,60}$")
CONTROL_CHARS_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
DEFAULT_COURSE_ID = "default"
DATA_LOCK = threading.RLock()
FILE_RETRY_DELAYS = (0.03, 0.08, 0.16, 0.32, 0.64)
FIREBASE_API_KEY = os.environ.get("FIREBASE_API_KEY") or "AIzaSyCmtnC-0L4vKnvlGaHhg4io7sy0dS7sLhY"


def ensure_data_root():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_ROOT.mkdir(parents=True, exist_ok=True)


def replace_file_with_retry(temp_file, target_file):
    last_error = None
    for index, delay in enumerate((0, *FILE_RETRY_DELAYS)):
        if delay:
            time.sleep(delay)
        try:
            temp_file.replace(target_file)
            return
        except PermissionError as error:
            last_error = error
            if index == len(FILE_RETRY_DELAYS):
                break

    try:
        target_file.write_bytes(temp_file.read_bytes())
        return
    except PermissionError:
        if last_error:
            raise last_error
        raise


def write_json_file(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_file = path.with_name(f"{path.stem}.{threading.get_ident()}.{uuid.uuid4().hex}.tmp")
    try:
        temp_file.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        replace_file_with_retry(temp_file, path)
    finally:
        temp_file.unlink(missing_ok=True)


def unlink_file_with_retry(path):
    last_error = None
    for index, delay in enumerate((0, *FILE_RETRY_DELAYS)):
        if delay:
            time.sleep(delay)
        try:
            path.unlink(missing_ok=True)
            return
        except PermissionError as error:
            last_error = error
            if index == len(FILE_RETRY_DELAYS):
                break
    if last_error:
        raise last_error


def load_deleted_rooms():
    try:
        data = json.loads(DELETED_ROOMS_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        data = {}
    rooms = data.get("rooms", {}) if isinstance(data, dict) else {}
    return rooms if isinstance(rooms, dict) else {}


def save_deleted_rooms(rooms):
    ensure_data_root()
    write_json_file(DELETED_ROOMS_FILE, {"rooms": rooms})


def mark_room_deleted(room_code, teacher=None):
    if not ROOM_RE.match(str(room_code or "")):
        return
    with DATA_LOCK:
        rooms = load_deleted_rooms()
        rooms[str(room_code)] = {
            "deletedAt": now_iso(),
            "teacherId": str((teacher or {}).get("id") or ""),
            "teacherUsername": str((teacher or {}).get("username") or "").strip().lower(),
        }
        save_deleted_rooms(rooms)


def room_is_deleted(room_code):
    return str(room_code or "") in load_deleted_rooms()


def migrate_legacy_data():
    if not LEGACY_MIGRATION_ENABLED:
        return
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
            if room_is_deleted(legacy_room.stem):
                continue
            target = DATA_DIR / legacy_room.name
            if not target.exists():
                target.write_bytes(legacy_room.read_bytes())


def storage_status():
    ensure_data_root()
    active_rooms = [path for path in DATA_DIR.glob("*.json") if ROOM_RE.match(path.stem) and not room_is_deleted(path.stem)]
    return {
        "dataRoot": str(DATA_ROOT),
        "roomsDir": str(DATA_DIR),
        "persistent": str(DATA_ROOT).replace("\\", "/").startswith("/var/data"),
        "legacyDataPresent": LEGACY_DATA_ROOT.exists(),
        "legacyMigrationEnabled": LEGACY_MIGRATION_ENABLED,
        "rooms": len(active_rooms),
        "teachersFile": TEACHERS_FILE.exists(),
    }


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def parse_iso(value):
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None


def clean_text(value, max_length, fallback=""):
    text = CONTROL_CHARS_RE.sub("", str(value or "")).strip()
    return text[:max_length] or fallback


def load_teachers():
    try:
        data = json.loads(TEACHERS_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        data = {"teachers": []}
    if not isinstance(data, dict) or not isinstance(data.get("teachers"), list):
        return {"teachers": []}
    return data


def save_teachers(data):
    with DATA_LOCK:
        write_json_file(TEACHERS_FILE, data)


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
    name = clean_text(payload.get("name"), 40)
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
        "passwordUpdatedAt": now_iso(),
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


def firebase_account(id_token):
    token = str(id_token or "").strip()
    if not token:
        return None, "Missing Firebase ID token"

    request = Request(
        f"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={FIREBASE_API_KEY}",
        data=json.dumps({"idToken": token}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=10) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        return None, "Invalid Firebase ID token"

    users = payload.get("users") if isinstance(payload, dict) else None
    if not isinstance(users, list) or not users:
        return None, "Firebase user was not found"

    account = users[0]
    uid = clean_text(account.get("localId"), 128)
    email = clean_text(account.get("email"), 254).lower()
    if not uid or not email or not account.get("emailVerified"):
        return None, "A verified Google email is required"

    return {
        "uid": uid,
        "email": email,
        "name": clean_text(account.get("displayName"), 40, email.split("@", 1)[0]),
    }, None


def login_firebase_teacher(id_token):
    account, error = firebase_account(id_token)
    if error:
        return None, error

    data = load_teachers()
    teacher = next(
        (
            item
            for item in data["teachers"]
            if item.get("firebaseUid") == account["uid"]
            or str(item.get("username", "")).strip().lower() == account["email"]
        ),
        None,
    )

    if teacher:
        teacher["firebaseUid"] = account["uid"]
        teacher["email"] = account["email"]
        teacher["authProvider"] = "firebase-google"
        if account["name"]:
            teacher["name"] = account["name"]
    else:
        teacher = {
            "id": uuid.uuid4().hex,
            "username": account["email"],
            "email": account["email"],
            "name": account["name"],
            "firebaseUid": account["uid"],
            "authProvider": "firebase-google",
            "salt": "",
            "passwordHash": "",
            "createdAt": now_iso(),
            "passwordUpdatedAt": now_iso(),
        }
        data["teachers"].append(teacher)

    save_teachers(data)
    return teacher, None


def reset_teacher_password(teacher, payload):
    password = str(payload.get("password", ""))
    if len(password) < 6:
        return None, "Invalid reset request"
    data = load_teachers()
    target = None
    for item in data["teachers"]:
        if item.get("id") == teacher.get("id"):
            target = item
            break
    if not target:
        return None, "Invalid reset request"
    name = clean_text(payload.get("name"), 40)
    if name:
        target["name"] = name
    salt, digest = password_hash(password)
    target["salt"] = salt
    target["passwordHash"] = digest
    target["passwordUpdatedAt"] = now_iso()
    save_teachers(data)
    return target, None


def issue_session(teacher):
    teacher_id = teacher["id"]
    issued_at = str(int(datetime.now(timezone.utc).timestamp()))
    password_marker = str(teacher.get("passwordUpdatedAt") or teacher.get("createdAt") or "")
    password_marker_hash = hashlib.sha256(password_marker.encode("utf-8")).hexdigest()
    signed = f"{teacher_id}.{issued_at}.{password_marker_hash}"
    signature = hmac.new(session_secret().encode("utf-8"), signed.encode("utf-8"), hashlib.sha256).hexdigest()
    raw = f"{signed}.{signature}".encode("utf-8")
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
        parts = raw.split(".")
    except (ValueError, UnicodeDecodeError):
        return None
    if len(parts) == 4:
        teacher_id, issued_at, password_marker_hash, signature = parts
        signed = f"{teacher_id}.{issued_at}.{password_marker_hash}"
        try:
            issued_dt = datetime.fromtimestamp(int(issued_at), tz=timezone.utc)
        except (TypeError, ValueError, OSError):
            return None
        if datetime.now(timezone.utc) - issued_dt > SESSION_MAX_AGE:
            return None
    else:
            return None
    expected = hmac.new(session_secret().encode("utf-8"), signed.encode("utf-8"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return None
    for teacher in load_teachers()["teachers"]:
        if teacher.get("id") == teacher_id:
            current_marker = str(teacher.get("passwordUpdatedAt") or teacher.get("createdAt") or "")
            current_marker_hash = hashlib.sha256(current_marker.encode("utf-8")).hexdigest()
            if not hmac.compare_digest(password_marker_hash, current_marker_hash):
                return None
            return teacher
    return None


def room_file(room_code):
    if not ROOM_RE.match(room_code):
        return None
    return DATA_DIR / f"{room_code}.json"


def room_exists(room_code):
    path = room_file(room_code)
    return path is not None and path.exists() and not room_is_deleted(room_code)


def generate_room_code():
    for _ in range(200):
        code = str(uuid.uuid4().int % 100000000).zfill(8)[:8]
        if code != "00000000" and not room_exists(code) and not room_is_deleted(code):
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
        room["postsByCourse"][course_id] = sanitize_posts(posts)

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
    with DATA_LOCK:
        write_json_file(path, room)


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
    unlink_file_with_retry(old_path)
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
        "name": clean_text(value.get("name"), 40),
        "username": clean_text(value.get("username"), 60),
    }


def sanitize_course_name(value):
    return clean_text(value, 40, "未命名課程")


def sanitize_course_code(value):
    value = str(value or "").strip()
    return value if COURSE_CODE_RE.match(value) else ""


def sanitize_room_name(value):
    return clean_text(value, 32)


def sanitize_post(post):
    if not isinstance(post, dict):
        return None
    image = str(post.get("image", ""))
    if not valid_png_data_url(image):
        image = ""
    return {
        "id": clean_text(post.get("id"), 80) or uuid.uuid4().hex,
        "name": clean_text(post.get("name"), 18),
        "prompt": clean_text(post.get("prompt"), 32, "中文手寫練習"),
        "image": image,
        "courseId": clean_text(post.get("courseId"), 64),
        "createdAt": clean_text(post.get("createdAt"), 40, now_iso()),
    }


def sanitize_posts(posts):
    clean = []
    if not isinstance(posts, list):
        return clean
    for post in posts:
        clean_post = sanitize_post(post)
        if clean_post and clean_post["name"] and clean_post["image"]:
            clean.append(clean_post)
    return clean


def valid_png_data_url(value):
    if not isinstance(value, str) or not value.startswith("data:image/png;base64,"):
        return False
    if len(value.encode("utf-8")) > MAX_IMAGE_DATA_URL_BYTES:
        return False
    encoded = value.split(",", 1)[1]
    if not re.fullmatch(r"[A-Za-z0-9+/=\s]+", encoded):
        return False
    try:
        raw = base64.b64decode(encoded, validate=True)
    except (ValueError, binascii.Error):
        return False
    return raw.startswith(b"\x89PNG\r\n\x1a\n")


def read_json(handler):
    try:
        content_length = int(handler.headers.get("Content-Length", "0"))
    except (TypeError, ValueError):
        return None
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


def csrf_token():
    return secrets.token_urlsafe(32)


def request_cookie(handler, name):
    raw_cookie = handler.headers.get("Cookie", "")
    if not raw_cookie:
        return ""
    cookie = SimpleCookie()
    try:
        cookie.load(raw_cookie)
    except Exception:
        return ""
    morsel = cookie.get(name)
    return morsel.value if morsel else ""


def should_mark_secure_cookie(handler):
    forwarded_proto = handler.headers.get("X-Forwarded-Proto", "").lower()
    return forwarded_proto == "https"


def csrf_cookie_header(handler, token):
    parts = [
        f"{CSRF_COOKIE_NAME}={token}",
        "Path=/",
        f"Max-Age={int(SESSION_MAX_AGE.total_seconds())}",
        "HttpOnly",
        "SameSite=Strict",
    ]
    if should_mark_secure_cookie(handler):
        parts.append("Secure")
    return "; ".join(parts)


def json_response_with_csrf(handler, status, payload):
    token = csrf_token()
    response_payload = dict(payload)
    response_payload["csrfToken"] = token
    body = json.dumps(response_payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Set-Cookie", csrf_cookie_header(handler, token))
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def csrf_exempt_path(path):
    return path in {"/api/teacher/register", "/api/teacher/login", "/api/csrf"}


def validate_csrf(handler, path):
    if handler.command not in {"POST", "PATCH", "DELETE"}:
        return True
    if csrf_exempt_path(path):
        return True
    cookie_token = request_cookie(handler, CSRF_COOKIE_NAME)
    header_token = handler.headers.get("X-CSRF-Token", "").strip()
    if not cookie_token or not header_token or not hmac.compare_digest(cookie_token, header_token):
        if header_token and is_allowed_origin(handler):
            return True
        json_response(handler, 403, {"error": "CSRF token mismatch"})
        return False
    return True


def post_collection_version(posts):
    if not isinstance(posts, list):
        return "0:"
    parts = [str(len(posts))]
    for post in posts:
        if not isinstance(post, dict):
            continue
        parts.append(str(post.get("id", "")))
        parts.append(str(post.get("createdAt", "")))
    raw = "|".join(parts).encode("utf-8")
    return hashlib.sha1(raw).hexdigest()


def public_course(course, include_code=False):
    clean = {
        "id": clean_text(course.get("id"), 64),
        "name": sanitize_course_name(course.get("name")),
        "createdAt": clean_text(course.get("createdAt"), 40),
    }
    if include_code:
        clean["code"] = sanitize_course_code(course.get("code"))
    return clean


def room_summary(room, include_codes=False, include_teacher=False, course_id=None):
    courses = room.get("courses", [])
    if course_id:
        courses = [course for course in courses if course.get("id") == course_id]
    return {
        "room": room["room"],
        "name": room.get("name", ""),
        "exists": True,
        "teacher": room.get("teacher", {}) if include_teacher else {},
        "courses": [public_course(course, include_codes) for course in courses],
        "activeCourseId": course_id or room.get("activeCourseId", DEFAULT_COURSE_ID),
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


def parse_course_posts_meta_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses/([a-zA-Z0-9_-]{1,64})/posts/meta", path)
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
        if not ROOM_RE.match(room_code) or room_is_deleted(room_code):
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
        if not ROOM_RE.match(room_code) or room_is_deleted(room_code):
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
        if not ROOM_RE.match(room_code) or room_is_deleted(room_code):
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


def course_matches_code(room, course_id, course_code):
    course_code = sanitize_course_code(course_code)
    if not course_code:
        return False
    for course in room.get("courses", []):
        if course.get("id") == course_id and sanitize_course_code(course.get("code")) == course_code:
            return True
    return False


def request_course_code(handler, payload=None, query=None):
    if payload and isinstance(payload, dict):
        code = sanitize_course_code(payload.get("courseCode"))
        if code:
            return code
    if query is not None:
        code = sanitize_course_code(parse_qs(query).get("courseCode", [""])[0])
        if code:
            return code
    return sanitize_course_code(handler.headers.get("X-Course-Code", ""))


def is_allowed_origin(handler):
    origin = handler.headers.get("Origin", "")
    if not origin:
        return ""
    try:
        origin_host = urlparse(origin).netloc
    except ValueError:
        return ""
    request_host = handler.headers.get("Host", "")
    return origin if origin_host and request_host and origin_host == request_host else ""


def is_sensitive_static_path(path):
    decoded = unquote_plus(path).replace("\\", "/")
    if decoded.startswith("/data/") or decoded == "/data":
        return True
    blocked = {
        "/server.py",
        "/server-runtime.log",
        "/server.err.log",
        "/server.out.log",
        "/google-client-id.txt",
    }
    return decoded in blocked or decoded.endswith(".pyc")


class ClassroomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        return

    def end_headers(self):
        allowed_origin = is_allowed_origin(self)
        if allowed_origin:
            self.send_header("Access-Control-Allow-Origin", allowed_origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Teacher-Token, X-Course-Code, X-CSRF-Token")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "same-origin")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self' https://www.gstatic.com https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://lh3.googleusercontent.com; connect-src 'self' https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com; frame-src https://handwritten-bulletin.firebaseapp.com https://accounts.google.com https://apis.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'")
        if not urlparse(self.path).path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_HEAD(self):
        path = urlparse(self.path).path
        if is_sensitive_static_path(path):
            self.send_response(404)
            self.end_headers()
            return
        super().do_HEAD()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        if is_sensitive_static_path(path):
            json_response(self, 404, {"error": "Not found"})
            return

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

        if path == "/api/csrf":
            json_response_with_csrf(self, 200, {"ok": True})
            return

        course_code = parse_course_lookup_path(path)
        if course_code:
            room, course = find_course_by_code(course_code)
            if not room or not course:
                json_response(self, 404, {"error": "Course not found"})
                return
            summary = room_summary(room, course_id=course["id"])
            json_response(self, 200, summary)
            return

        room_code = parse_room_path(path)
        if room_code:
            if not room_exists(room_code):
                json_response(self, 200, {"room": room_code, "exists": False})
                return
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            json_response(self, 200, room_summary(room, include_codes=True, include_teacher=True))
            return

        room_code = parse_courses_path(path)
        if room_code:
            teacher, room = require_room_owner(self, room_code)
            if not teacher:
                return
            json_response(self, 200, {"courses": [public_course(course, True) for course in room["courses"]], "activeCourseId": room["activeCourseId"]})
            return

        parsed = parse_course_posts_meta_path(path)
        if parsed:
            room_code, course_id = parsed
            if not room_exists(room_code):
                json_response(self, 404, {"error": "Room not found"})
                return
            room = load_room(room_code)
            if course_id not in room["postsByCourse"]:
                json_response(self, 404, {"error": "Course not found"})
                return
            teacher, _room = require_room_owner(self, room_code)
            if not teacher:
                return
            course_posts = room["postsByCourse"][course_id]
            json_response(
                self,
                200,
                {
                    "version": post_collection_version(course_posts),
                    "count": len(course_posts),
                },
            )
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
            student_name = clean_text(unquote_plus(parse_qs(parsed_url.query).get("student", [""])[0]), 18)
            course_posts = room["postsByCourse"][course_id]
            if student_name:
                if not course_matches_code(room, course_id, request_course_code(self, query=parsed_url.query)):
                    json_response(self, 403, {"error": "Invalid course code"})
                    return
                course_posts = [post for post in course_posts if str(post.get("name", "")).strip() == student_name]
            else:
                teacher, _room = require_room_owner(self, room_code)
                if not teacher:
                    return
            json_response(self, 200, sanitize_posts(course_posts))
            return

        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        if not validate_csrf(self, path):
            return

        if path == "/api/teacher/firebase-login":
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            teacher, error = login_firebase_teacher(payload.get("idToken"))
            if error:
                json_response(self, 401, {"error": error})
                return
            json_response_with_csrf(self, 200, {"token": issue_session(teacher), "teacher": public_teacher(teacher)})
            return

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
            json_response_with_csrf(self, 200, {"token": issue_session(teacher), "teacher": public_teacher(teacher)})
            return

        if path == "/api/teacher/reset-password":
            auth_teacher = require_teacher(self)
            if not auth_teacher:
                return
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            teacher, error = reset_teacher_password(auth_teacher, payload)
            if error:
                json_response(self, 400, {"error": error})
                return
            json_response_with_csrf(self, 200, {"token": issue_session(teacher), "teacher": public_teacher(teacher)})
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
            json_response(self, 200, room_summary(room, include_codes=True, include_teacher=True))
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
            json_response(self, 200, room_summary(room, include_codes=True, include_teacher=True))
            return

        room_code = parse_rotate_path(path)
        if room_code:
            teacher, _room = require_room_owner(self, room_code)
            if not teacher:
                return
            room = rotate_active_course_code(room_code)
            json_response(self, 200, room_summary(room, include_codes=True, include_teacher=True))
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
            json_response(self, 200, {"course": public_course(course, True), "courses": [public_course(item, True) for item in room["courses"]], "activeCourseId": course["id"]})
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

        name = clean_text(payload.get("name"), 18)
        prompt = clean_text(payload.get("prompt"), 32, "中文手寫練習")
        image = str(payload.get("image", ""))
        if not name or not valid_png_data_url(image):
            json_response(self, 400, {"error": "Missing name or handwriting image"})
            return

        with DATA_LOCK:
            room = load_room(room_code)
            if course_id not in room["postsByCourse"]:
                json_response(self, 404, {"error": "Course not found"})
                return
            if not course_matches_code(room, course_id, request_course_code(self, payload=payload)):
                json_response(self, 403, {"error": "Invalid course code"})
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
            room["postsByCourse"][course_id] = room["postsByCourse"][course_id][:MAX_POSTS_PER_COURSE]
            save_room(room_code, room)
            own_posts = [post for post in room["postsByCourse"][course_id] if str(post.get("name", "")).strip() == name]
        json_response(self, 200, sanitize_posts(own_posts))

    def do_PATCH(self):
        path = urlparse(self.path).path
        if not validate_csrf(self, path):
            return
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
            json_response(self, 200, room_summary(room, include_codes=True, include_teacher=True))
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
                json_response(self, 200, {"course": public_course(course, True), "courses": [public_course(item, True) for item in room["courses"]], "activeCourseId": room.get("activeCourseId", DEFAULT_COURSE_ID)})
                return
        json_response(self, 404, {"error": "Course not found"})

    def do_DELETE(self):
        path = urlparse(self.path).path
        if not validate_csrf(self, path):
            return
        room_code = parse_room_path(path)
        if room_code:
            teacher, _room = require_room_owner(self, room_code)
            if not teacher:
                return
            mark_room_deleted(room_code, teacher)
            file_removed = True
            try:
                unlink_file_with_retry(room_file(room_code))
            except OSError:
                file_removed = False
            json_response(self, 200, {"deleted": True, "room": room_code, "fileRemoved": file_removed})
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
            json_response(self, 200, sanitize_posts(room["postsByCourse"][course_id]))
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
            default_course = next((course for course in room["courses"] if course.get("id") == DEFAULT_COURSE_ID), None)
            if not default_course:
                default_course = default_room(room_code)["courses"][0]
                default_course["code"] = generate_course_code()
                room["courses"].insert(0, default_course)
            room["postsByCourse"].setdefault(DEFAULT_COURSE_ID, [])
            if not room["courses"]:
                room["courses"] = [default_course]
                room["postsByCourse"] = {DEFAULT_COURSE_ID: []}
            active_course_id = DEFAULT_COURSE_ID
            room["activeCourseId"] = active_course_id
            room["postsByCourse"].setdefault(active_course_id, [])
            save_room(room_code, room)
            json_response(
                self,
                200,
                {
                    "deleted": True,
                    "courseId": course_id,
                    "courses": [public_course(course, True) for course in room["courses"]],
                    "activeCourseId": active_course_id,
                    "posts": sanitize_posts(room["postsByCourse"][active_course_id]),
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


class ClassroomHTTPServer(ThreadingHTTPServer):
    daemon_threads = True
    request_queue_size = 256


def main():
    migrate_legacy_data()
    log_path = ROOT / "server-runtime.log"
    sys.stdout = open(log_path, "a", encoding="utf-8", buffering=1)
    sys.stderr = sys.stdout
    host = "0.0.0.0"
    port = int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 8030))
    server = ClassroomHTTPServer((host, port), ClassroomHandler)
    print(f"Classroom handwriting board: http://127.0.0.1:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
