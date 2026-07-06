from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import os
import sys
import threading
import socket


ROOT = Path(__file__).resolve().parent
STATE = {"rev": 0, "state": None}
LOCK = threading.Lock()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        return

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, status, payload):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api/state"):
            with LOCK:
                payload = {"rev": STATE["rev"], "state": STATE["state"]}
            self._json(200, payload)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/state"):
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length)
            try:
                body = json.loads(raw.decode("utf-8"))
            except Exception:
                self._json(400, {"error": "Invalid JSON"})
                return
            with LOCK:
                STATE["rev"] += 1
                STATE["state"] = body.get("state")
                payload = {"rev": STATE["rev"]}
            self._json(200, payload)
            return
        self._json(404, {"error": "Not found"})


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", "8044"))
    host = sys.argv[2] if len(sys.argv) > 2 else os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), Handler)
    safe_print(f"Pinyin Kitchen server running at http://127.0.0.1:{port}/")
    if host == "0.0.0.0":
        for ip in local_ips():
            safe_print(f"LAN URL: http://{ip}:{port}/")
    server.serve_forever()


def safe_print(message):
    try:
        print(message, flush=True)
    except Exception:
        pass


def local_ips():
    ips = []
    try:
        hostname = socket.gethostname()
        for item in socket.getaddrinfo(hostname, None, socket.AF_INET):
            ip = item[4][0]
            if not ip.startswith("127.") and ip not in ips:
                ips.append(ip)
    except Exception:
        pass
    return ips


if __name__ == "__main__":
    main()
