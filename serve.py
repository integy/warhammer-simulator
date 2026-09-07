#!/usr/bin/env python3
"""Minimal SPA dev server for warhammer-simulator.
Serves static files; falls back to index.html for unknown routes (client-side routing).
Usage: python3 serve.py [port]
"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0]
        full = os.path.join(ROOT, path.lstrip("/"))
        if os.path.isfile(full):
            return super().do_GET()
        # SPA fallback
        self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
