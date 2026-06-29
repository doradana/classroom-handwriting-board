from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
import json
import os
import re
import sys
import uuid
from datetime import datetime, timezone


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data" / "rooms"
GOOGLE_CLIENT_ID_FILE = ROOT / "google-client-id.txt"
MAX_BODY_BYTES = 4 * 1024 * 1024
ROOM_RE = re.compile(r"^[0-9]{4,8}$")
COURSE_RE = re.compile(r"^[a-zA-Z0-9_-]{1,64}$")
DEFAULT_COURSE_ID = "default"


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def google_client_id():
    env_value = os.environ.get("GOOGLE_CLIENT_ID", "").strip()
    if env_value:
        return env_value
    if GOOGLE_CLIENT_ID_FILE.exists():
        return GOOGLE_CLIENT_ID_FILE.read_text(encoding="utf-8").strip()
    return ""


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


def default_room(room_code):
    return {
        "room": room_code,
        "teacher": {},
        "courses": [
            {
                "id": DEFAULT_COURSE_ID,
                "name": "預設課程",
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
        clean_courses.append(
            {
                "id": course_id,
                "name": name,
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


def load_room(room_code):
    path = room_file(room_code)
    if path is None or not path.exists():
        return default_room(room_code)
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        data = {}
    return normalize_room(room_code, data)


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


def ensure_room(room_code, teacher=None):
    room = load_room(room_code)
    if teacher:
        room["teacher"] = sanitize_teacher(teacher)
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
        "exists": True,
        "teacher": room.get("teacher", {}),
        "courses": room.get("courses", []),
        "activeCourseId": room.get("activeCourseId", DEFAULT_COURSE_ID),
    }


def parse_room_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})", path)
    return match.group(1) if match else None


def parse_courses_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses", path)
    return match.group(1) if match else None


def parse_rotate_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/rotate", path)
    return match.group(1) if match else None


def parse_course_posts_path(path):
    match = re.fullmatch(r"/api/rooms/([0-9]{4,8})/courses/([a-zA-Z0-9_-]{1,64})/posts", path)
    return match.groups() if match else None


class ClassroomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/api/google-config":
            json_response(self, 200, {"clientId": google_client_id()})
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
            json_response(self, 200, room["postsByCourse"][course_id])
            return

        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path

        room_code = parse_room_path(path)
        if room_code:
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            if payload.get("role") != "teacher":
                json_response(self, 403, {"error": "Only teachers can create rooms"})
                return
            room = ensure_room(room_code, payload.get("teacher"))
            json_response(self, 200, room_summary(room))
            return

        room_code = parse_rotate_path(path)
        if room_code:
            room = rotate_room_code(room_code)
            if room is None:
                json_response(self, 404, {"error": "Room not found"})
                return
            json_response(self, 200, room_summary(room))
            return

        room_code = parse_courses_path(path)
        if room_code:
            if not room_exists(room_code):
                json_response(self, 404, {"error": "Room not found"})
                return
            payload = read_json(self)
            if payload is None:
                json_response(self, 400, {"error": "Invalid JSON"})
                return
            room = load_room(room_code)
            course = {
                "id": uuid.uuid4().hex[:12],
                "name": sanitize_course_name(payload.get("name")),
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
        json_response(self, 200, room["postsByCourse"][course_id])

    def do_DELETE(self):
        parsed = parse_course_posts_path(urlparse(self.path).path)
        if not parsed:
            json_response(self, 404, {"error": "Not found"})
            return
        room_code, course_id = parsed
        if not room_exists(room_code):
            json_response(self, 404, {"error": "Room not found"})
            return
        room = load_room(room_code)
        if course_id not in room["postsByCourse"]:
            json_response(self, 404, {"error": "Course not found"})
            return
        room["postsByCourse"][course_id] = []
        save_room(room_code, room)
        json_response(self, 200, [])


def main():
    host = "0.0.0.0"
    port = int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 8030))
    server = ThreadingHTTPServer((host, port), ClassroomHandler)
    print(f"Classroom handwriting board: http://127.0.0.1:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
