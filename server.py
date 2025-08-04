import http.server
import socketserver
import os

PORT = 8081
Handler = http.server.SimpleHTTPRequestHandler


with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servindo arquivos da raiz do projeto na porta {PORT}")
    print(f"Acesse: http://localhost:{PORT}")
    httpd.serve_forever()
