import http.server
import socketserver

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servindo na porta {PORT}")
    print(f"Acesse: http://localhost:{PORT}")
    httpd.serve_forever()
