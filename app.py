from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def home():
    # Serve o index.html da raiz do projeto
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'index.html')

# Opcional: servir outros arquivos estáticos (css, js, imagens, etc)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
