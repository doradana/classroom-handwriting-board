from datetime import datetime, timezone
from urllib.parse import quote
import base64
import copy
import json
import os
import secrets
import threading


BACKEND_ENV = "CLASSROOM_STORAGE_BACKEND"
SERVICE_ACCOUNT_ENV = "FIREBASE_SERVICE_ACCOUNT_JSON"
PROJECT_ID_ENV = "FIREBASE_PROJECT_ID"
BUCKET_ENV = "FIREBASE_STORAGE_BUCKET"
IMAGE_BACKEND_ENV = "FIREBASE_IMAGE_BACKEND"
IMAGE_CHUNK_SIZE = 700_000


def firebase_requested():
    return os.environ.get(BACKEND_ENV, "").strip().lower() == "firebase"


class FirebaseStore:
    def __init__(self):
        try:
            import firebase_admin
            from firebase_admin import credentials, firestore, storage
        except ImportError as error:
            raise RuntimeError("firebase-admin is not installed") from error

        service_account_json = os.environ.get(SERVICE_ACCOUNT_ENV, "").strip()
        service_account = None
        if service_account_json:
            try:
                service_account = json.loads(service_account_json)
            except json.JSONDecodeError as error:
                raise RuntimeError(f"{SERVICE_ACCOUNT_ENV} is not valid JSON") from error
            credential = credentials.Certificate(service_account)
        elif os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
            credential = credentials.Certificate(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
        else:
            credential = credentials.ApplicationDefault()

        project_id = (
            os.environ.get(PROJECT_ID_ENV, "").strip()
            or str((service_account or {}).get("project_id") or "").strip()
        )
        bucket_name = os.environ.get(BUCKET_ENV, "").strip()
        self.image_backend = os.environ.get(IMAGE_BACKEND_ENV, "firestore").strip().lower()
        if self.image_backend not in {"firestore", "storage"}:
            raise RuntimeError(f"{IMAGE_BACKEND_ENV} must be firestore or storage")
        if self.image_backend == "storage" and not bucket_name:
            raise RuntimeError(f"{BUCKET_ENV} is required when using Firebase Storage")

        options = {}
        if bucket_name:
            options["storageBucket"] = bucket_name
        if project_id:
            options["projectId"] = project_id

        try:
            self.app = firebase_admin.get_app("classroom-storage")
        except ValueError:
            self.app = firebase_admin.initialize_app(
                credential,
                options,
                name="classroom-storage",
            )

        self.db = firestore.client(self.app)
        self.bucket = storage.bucket(app=self.app) if self.image_backend == "storage" else None
        self.project_id = project_id or getattr(self.app, "project_id", "")
        self.bucket_name = bucket_name
        self.rooms = self.db.collection("classroomRooms")
        self.teachers = self.db.collection("classroomTeachers")
        self.deleted_rooms = self.db.collection("classroomDeletedRooms")
        self.system = self.db.collection("classroomSystem")
        self.course_codes = self.db.collection("classroomCourseCodes")
        self._room_cache = {}
        self._cache_lock = threading.RLock()

    def status(self):
        return {
            "backend": "firebase",
            "persistent": True,
            "projectId": self.project_id,
            "imageBackend": self.image_backend,
            "storageBucket": self.bucket_name if self.image_backend == "storage" else "",
            "rooms": len(self.list_room_codes()),
        }

    def load_teachers(self):
        teachers = []
        for snapshot in self.teachers.stream():
            teacher = snapshot.to_dict() or {}
            teacher.setdefault("id", snapshot.id)
            teachers.append(teacher)
        return {"teachers": teachers}

    def save_teachers(self, data):
        teachers = data.get("teachers", []) if isinstance(data, dict) else []
        for teacher in teachers:
            if not isinstance(teacher, dict) or not teacher.get("id"):
                continue
            self.teachers.document(str(teacher["id"])).set(teacher)

    def session_secret(self):
        reference = self.system.document("session")
        snapshot = reference.get()
        if snapshot.exists:
            secret = str((snapshot.to_dict() or {}).get("secret") or "").strip()
            if secret:
                return secret
        secret = secrets.token_hex(32)
        try:
            reference.create({"secret": secret, "createdAt": _now_iso()})
            return secret
        except Exception:
            snapshot = reference.get()
            existing = str((snapshot.to_dict() or {}).get("secret") or "").strip()
            if existing:
                return existing
            raise

    def deleted_room_map(self):
        deleted = {}
        for snapshot in self.deleted_rooms.stream():
            deleted[snapshot.id] = snapshot.to_dict() or {}
        return deleted

    def mark_room_deleted(self, room_code, payload):
        self.deleted_rooms.document(str(room_code)).set(payload)

    def room_is_deleted(self, room_code):
        return self.deleted_rooms.document(str(room_code)).get().exists

    def room_exists(self, room_code):
        if self.room_is_deleted(room_code):
            return False
        with self._cache_lock:
            if str(room_code) in self._room_cache:
                return True
        return self.rooms.document(str(room_code)).get().exists

    def list_room_codes(self):
        deleted = set(self.deleted_room_map())
        return [snapshot.id for snapshot in self.rooms.stream() if snapshot.id not in deleted]

    def load_room(self, room_code):
        with self._cache_lock:
            cached = self._room_cache.get(str(room_code))
            if cached is not None:
                return copy.deepcopy(cached)
        snapshot = self.rooms.document(str(room_code)).get()
        if not snapshot.exists:
            return None
        room = snapshot.to_dict() or {}
        room["room"] = str(room_code)
        posts_by_course = {
            str(course.get("id")): []
            for course in room.get("courses", [])
            if isinstance(course, dict) and course.get("id")
        }
        room_reference = self.rooms.document(str(room_code))
        image_chunks = {}
        for chunk_snapshot in room_reference.collection("postImageChunks").stream():
            chunk = chunk_snapshot.to_dict() or {}
            post_id = str(chunk.get("postId") or "")
            if post_id:
                image_chunks.setdefault(post_id, []).append(
                    (int(chunk.get("index") or 0), str(chunk.get("data") or ""))
                )
        for post_snapshot in room_reference.collection("posts").stream():
            post = post_snapshot.to_dict() or {}
            post.setdefault("id", post_snapshot.id)
            if post.get("imageStore") == "firestore":
                chunks = sorted(image_chunks.get(post_snapshot.id, []))
                post["image"] = "data:image/png;base64," + "".join(data for _index, data in chunks)
            course_id = str(post.get("courseId") or "")
            posts_by_course.setdefault(course_id, []).append(post)
        for posts in posts_by_course.values():
            posts.sort(key=lambda item: str(item.get("createdAt") or ""), reverse=True)
        room["postsByCourse"] = posts_by_course
        with self._cache_lock:
            self._room_cache[str(room_code)] = copy.deepcopy(room)
        return copy.deepcopy(room)

    def save_room_metadata(self, room_code, room):
        room_reference = self.rooms.document(str(room_code))
        previous = room_reference.get()
        previous_courses = (previous.to_dict() or {}).get("courses", []) if previous.exists else []
        previous_codes = {
            str(course.get("code") or "")
            for course in previous_courses
            if isinstance(course, dict) and course.get("code")
        }
        metadata = {
            key: value
            for key, value in room.items()
            if key != "postsByCourse"
        }
        metadata["room"] = str(room_code)
        metadata["updatedAt"] = _now_iso()
        room_reference.set(metadata)
        current_codes = set()
        for course in room.get("courses", []):
            if not isinstance(course, dict):
                continue
            code = str(course.get("code") or "")
            course_id = str(course.get("id") or "")
            if code and course_id:
                current_codes.add(code)
                self.course_codes.document(code).set(
                    {"room": str(room_code), "courseId": course_id, "updatedAt": _now_iso()}
                )
        for old_code in previous_codes - current_codes:
            old_reference = self.course_codes.document(old_code)
            old_snapshot = old_reference.get()
            if old_snapshot.exists and str((old_snapshot.to_dict() or {}).get("room") or "") == str(room_code):
                old_reference.delete()
        self.deleted_rooms.document(str(room_code)).delete()
        with self._cache_lock:
            self._room_cache.pop(str(room_code), None)

    def add_post(self, room_code, course_id, post):
        post_id = str(post["id"])
        image_path, image_url, image_store = self._upload_image(
            room_code,
            course_id,
            post_id,
            post.get("image", ""),
        )
        stored = dict(post)
        stored["image"] = image_url
        stored["imagePath"] = image_path
        stored["imageStore"] = image_store
        self.rooms.document(str(room_code)).collection("posts").document(post_id).set(stored)
        self.rooms.document(str(room_code)).update({"updatedAt": _now_iso()})
        course_posts = []
        for snapshot in self.rooms.document(str(room_code)).collection("posts").stream():
            payload = snapshot.to_dict() or {}
            if str(payload.get("courseId") or "") == str(course_id):
                course_posts.append((str(payload.get("createdAt") or ""), snapshot.id))
        course_posts.sort(reverse=True)
        for _created_at, expired_post_id in course_posts[200:]:
            self.delete_post(room_code, expired_post_id)
        with self._cache_lock:
            self._room_cache.pop(str(room_code), None)
        return stored

    def delete_post(self, room_code, post_id):
        reference = self.rooms.document(str(room_code)).collection("posts").document(str(post_id))
        snapshot = reference.get()
        if not snapshot.exists:
            return False
        post = snapshot.to_dict() or {}
        image_path = str(post.get("imagePath") or "")
        if post.get("imageStore") == "storage" and image_path and self.bucket:
            try:
                self.bucket.blob(image_path).delete()
            except Exception:
                pass
        chunks = self.rooms.document(str(room_code)).collection("postImageChunks")
        for chunk_snapshot in list(chunks.stream()):
            chunk = chunk_snapshot.to_dict() or {}
            if str(chunk.get("postId") or "") == str(post_id):
                chunk_snapshot.reference.delete()
        reference.delete()
        self.rooms.document(str(room_code)).update({"updatedAt": _now_iso()})
        with self._cache_lock:
            self._room_cache.pop(str(room_code), None)
        return True

    def clear_course_posts(self, room_code, course_id):
        posts = self.rooms.document(str(room_code)).collection("posts")
        post_ids = set()
        for snapshot in list(posts.stream()):
            post = snapshot.to_dict() or {}
            if str(post.get("courseId") or "") != str(course_id):
                continue
            post_ids.add(snapshot.id)
            image_path = str(post.get("imagePath") or "")
            if post.get("imageStore") == "storage" and image_path and self.bucket:
                try:
                    self.bucket.blob(image_path).delete()
                except Exception:
                    pass
            snapshot.reference.delete()
        chunks = self.rooms.document(str(room_code)).collection("postImageChunks")
        for chunk_snapshot in list(chunks.stream()):
            chunk = chunk_snapshot.to_dict() or {}
            if str(chunk.get("postId") or "") in post_ids:
                chunk_snapshot.reference.delete()
        if post_ids:
            self.rooms.document(str(room_code)).update({"updatedAt": _now_iso()})
            with self._cache_lock:
                self._room_cache.pop(str(room_code), None)

    def delete_room(self, room_code):
        room_snapshot = self.rooms.document(str(room_code)).get()
        room_data = room_snapshot.to_dict() or {}
        for course in room_data.get("courses", []):
            code = str(course.get("code") or "") if isinstance(course, dict) else ""
            if code:
                self.course_codes.document(code).delete()
        posts = self.rooms.document(str(room_code)).collection("posts")
        post_ids = set()
        for snapshot in list(posts.stream()):
            post = snapshot.to_dict() or {}
            post_ids.add(snapshot.id)
            image_path = str(post.get("imagePath") or "")
            if post.get("imageStore") == "storage" and image_path and self.bucket:
                try:
                    self.bucket.blob(image_path).delete()
                except Exception:
                    pass
            snapshot.reference.delete()
        chunks = self.rooms.document(str(room_code)).collection("postImageChunks")
        for chunk_snapshot in list(chunks.stream()):
            chunk_snapshot.reference.delete()
        self.rooms.document(str(room_code)).delete()
        with self._cache_lock:
            self._room_cache.pop(str(room_code), None)

    def rename_room(self, old_room_code, new_room_code, room):
        self.save_room_metadata(new_room_code, room)
        old_posts = self.rooms.document(str(old_room_code)).collection("posts")
        new_posts = self.rooms.document(str(new_room_code)).collection("posts")
        for snapshot in list(old_posts.stream()):
            new_posts.document(snapshot.id).set(snapshot.to_dict() or {})
            snapshot.reference.delete()
        old_chunks = self.rooms.document(str(old_room_code)).collection("postImageChunks")
        new_chunks = self.rooms.document(str(new_room_code)).collection("postImageChunks")
        for snapshot in list(old_chunks.stream()):
            new_chunks.document(snapshot.id).set(snapshot.to_dict() or {})
            snapshot.reference.delete()
        self.rooms.document(str(old_room_code)).delete()
        with self._cache_lock:
            self._room_cache.pop(str(old_room_code), None)
            self._room_cache.pop(str(new_room_code), None)

    def course_location(self, course_code):
        snapshot = self.course_codes.document(str(course_code)).get()
        return snapshot.to_dict() if snapshot.exists else None

    def import_room(self, room_code, room):
        self.save_room_metadata(room_code, room)
        for course_id, posts in (room.get("postsByCourse") or {}).items():
            for post in posts if isinstance(posts, list) else []:
                post_id = str(post.get("id") or secrets.token_hex(16))
                reference = self.rooms.document(str(room_code)).collection("posts").document(post_id)
                if reference.get().exists:
                    continue
                imported = dict(post)
                imported["id"] = post_id
                imported["courseId"] = str(course_id)
                self.add_post(room_code, course_id, imported)

    def _upload_image(self, room_code, course_id, post_id, data_url):
        prefix = "data:image/png;base64,"
        if not isinstance(data_url, str) or not data_url.startswith(prefix):
            raise ValueError("Expected a PNG data URL")
        raw = base64.b64decode(data_url[len(prefix):], validate=True)
        if self.image_backend == "firestore":
            encoded = base64.b64encode(raw).decode("ascii")
            chunks = self.rooms.document(str(room_code)).collection("postImageChunks")
            for index, offset in enumerate(range(0, len(encoded), IMAGE_CHUNK_SIZE)):
                chunks.document(f"{post_id}_{index:04d}").set(
                    {
                        "postId": str(post_id),
                        "index": index,
                        "data": encoded[offset:offset + IMAGE_CHUNK_SIZE],
                    }
                )
            return "", "", "firestore"
        image_path = f"classroom-works/{room_code}/{course_id}/{post_id}.png"
        token = secrets.token_urlsafe(32)
        blob = self.bucket.blob(image_path)
        blob.metadata = {"firebaseStorageDownloadTokens": token}
        blob.upload_from_string(raw, content_type="image/png")
        blob.patch()
        image_url = (
            f"https://firebasestorage.googleapis.com/v0/b/{quote(self.bucket_name, safe='')}/o/"
            f"{quote(image_path, safe='')}?alt=media&token={quote(token, safe='')}"
        )
        return image_path, image_url, "storage"


def _now_iso():
    return datetime.now(timezone.utc).isoformat()


_STORE = None
_STORE_ERROR = ""
_STORE_LOCK = threading.Lock()


def get_firebase_store():
    global _STORE, _STORE_ERROR
    if not firebase_requested():
        return None
    if _STORE is not None:
        return _STORE
    with _STORE_LOCK:
        if _STORE is not None:
            return _STORE
        try:
            _STORE = FirebaseStore()
            _STORE_ERROR = ""
        except Exception as error:
            _STORE_ERROR = str(error)
            raise RuntimeError(f"Firebase storage initialization failed: {_STORE_ERROR}") from error
    return _STORE


def firebase_error():
    return _STORE_ERROR
