import http.server
import socketserver
import os
import webbrowser
import argparse

def run_server(port=8000, directory='.'):
    """
    Run a simple HTTP server to serve the current directory
    
    :param port: Port number to run the server on (default 8000)
    :param directory: Directory to serve (default current directory)
    """
    # Change to the specified directory
    os.chdir(directory)
    
    # Use SimpleHTTPRequestHandler to serve files
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Create socket server with the specified port
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"Serving at http://localhost:{port}")
        print(f"Serving directory: {os.path.abspath(directory)}")
        
        # Optional: Open the default web browser
        webbrowser.open(f'http://localhost:{port}')
        
        # Start the server
        httpd.serve_forever()

def main():
    # Create argument parser
    parser = argparse.ArgumentParser(description='Simple HTTP Server')
    parser.add_argument('-p', '--port', type=int, default=8000, 
                        help='Port to run the server on (default: 8000)')
    parser.add_argument('-d', '--directory', type=str, default='.', 
                        help='Directory to serve (default: current directory)')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Run the server
    run_server(args.port, args.directory)

if __name__ == '__main__':
    main()