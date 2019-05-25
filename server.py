from http.server import BaseHTTPRequestHandler, HTTPServer
from threading   import Thread

class ServerConcurent(HTTPServer):

    def process_request(self, request, client_address):
        Thread(target=self.requestNou, args=(self.RequestHandlerClass, request, client_address, self)).start()

    def requestNou(self, handlerClass, request, address, server):
        handlerClass(request, address, server)
        self.shutdown_request(request)

class RequestHandler(BaseHTTPRequestHandler):

    def do_HEAD(s):
        s.send_response(200)
        s.send_header("Content-type", "text/html")
        s.end_headers()
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        if self.path == "/":
            self.wfile.write(bytes(open("index.html","r").read(),"utf-8"))
        else:
            self.wfile.write(bytes("informatii valoroase","utf-8"))

server = ServerConcurent(('localhost',4034),RequestHandler)
Thread(target=server.serve_forever).start()

input()
server.shutdown()
