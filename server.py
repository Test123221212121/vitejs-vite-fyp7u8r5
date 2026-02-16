from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import sys
import os
from pathlib import Path
import socket
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class APIHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            # API endpoints
            if self.path.startswith('/api/'):
                if self.path == '/api/tasks':
                    self.send_json_response(self.load_json_file('kanban.json'))
                elif self.path == '/api/metadata':
                    self.send_json_response(self.load_json_file('metadata.json'))
                elif self.path == '/api/ai-activity':
                    self.send_json_response(self.load_json_file('ai_activity.json', default=[]))
                else:
                    self.send_error(404, "API endpoint not found")
            # Static files
            else:
                if self.path == '/':
                    self.path = '/index.html'
                return SimpleHTTPRequestHandler.do_GET(self)
                
        except Exception as e:
            logging.error(f"Error in GET handler: {str(e)}")
            self.send_error(500, str(e))

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            if self.path == '/api/save-tasks':
                self.save_json_file('kanban.json', data)
                self.send_json_response({"status": "ok"})
            elif self.path == '/api/save-metadata':
                self.save_json_file('metadata.json', data)
                self.send_json_response({"status": "ok"})
            elif self.path == '/api/log-activity':
                self.handle_activity_log(data)
                self.send_json_response({"status": "ok"})
            else:
                self.send_error(404, "API endpoint not found")
                
        except Exception as e:
            logging.error(f"Error in POST handler: {str(e)}")
            self.send_error(500, str(e))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.json'):
            return 'application/json'
        return super().guess_type(path)

    def end_headers(self):
        self.send_cors_headers()
        SimpleHTTPRequestHandler.end_headers(self)

    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')

    def send_json_response(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def load_json_file(self, filename, default=None):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            if default is not None:
                return default
            return {}

    def save_json_file(self, filename, data):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def handle_activity_log(self, data):
        activities = self.load_json_file('ai_activity.json', default=[])
        
        activities.append({
            'timestamp': int(time.time()),
            'action': data.get('action'),
            'details': data.get('details'),
            'type': data.get('type', 'system')
        })
        
        self.save_json_file('ai_activity.json', activities)

def run_server(port=3000):
    try:
        server = HTTPServer(('', port), APIHandler)
        logging.info(f'Server running on http://localhost:{port}')
        server.serve_forever()
    except Exception as e:
        logging.error(f"Server error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    run_server()