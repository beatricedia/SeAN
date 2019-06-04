from http.server import BaseHTTPRequestHandler, HTTPServer
from threading   import Thread

import os, json
import dbManager as db

class ServerConcurent(HTTPServer):

    def process_request(self, request, client_address):
        Thread(target=self.requestNou, args=(self.RequestHandlerClass, request, client_address, self)).start()

    def requestNou(self, handlerClass, request, address, server):
        handlerClass(request, address, server)
        self.shutdown_request(request)


class RequestHandler(BaseHTTPRequestHandler):

    def setHeader(self, data):
        self.send_response(data["code"])
        self.send_header('Content-type', data["type"])
        self.end_headers()

    def genSetCookieCode(self, id):
        code  = "\t<script>\n"
        code += '\t\tsetCookie("selectedAllergy",' + id + ',1)\n'
        code += "\t</script defer>"
        return code

    def getResource(self, resursa):
        data = dict()
        try:
            data["code"] = 200
            data["found"] = True
            if ".jpg" in resursa:
                data["type"] = "image/jpeg"
            elif ".css" in resursa:
                data["type"] = "text/css"
            elif ".html" in resursa:
                data["type"] = "text/html"
            elif ".js" in resursa:
                data["type"] = "text/javascript"
            elif resursa == "alergii":
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(db.formatAllSelectedAllergies()), "utf-8")
            elif "alergie" in resursa:
                data["type"] = "text/html"
                pagina_creata = open("allergy.html", "r").read()
                pagina_creata = pagina_creata.replace("<!--replace me senpai-->",self.genSetCookieCode(resursa.replace("alergie","")))
                data["file"] = bytes(pagina_creata, "utf-8")
            elif resursa == "suggestions":
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(db.formatAllSelectedSuggestions()), "utf-8")

            if resursa != "alergii" and "alergie" not in resursa and resursa != "suggestions":
                data["file"] = open(resursa, "rb").read()

        except Exception as exception:
            print(exception)
            data["code"] = 404
            data["found"] = False
            data["file"] = None
            data["type"] = None
            print(resursa)

        return data

    def do_GET(self):
        resursa = self.path[1:]
        if resursa == "":
            resursa = "index.html"
        data = self.getResource(resursa)
        print(data)
        self.setHeader(data)
        self.wfile.write(data["file"])

    def do_POST(self):
        path = self.path[1:]
        data = {}
        contentLength = int(self.headers['Content-Length'])
        dataPost = str(self.rfile.read(contentLength)).split("'")[1]
        parametri = json.loads(dataPost)

        if path == "login":
            data = self.login(parametri)
        elif path == "register":
            data = self.register(parametri)
        else:
            response = 404

        self.send_response(data["code"])
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(data), "UTF-8"))

    def login(self, parametri):
        response = {}

        if db.checkIfUserExists(parametri["email"]):
            if db.checkUserPassword(parametri["email"])[0][0] == parametri["password"]:
                data = db.selectAllFromUser(parametri["email"])
                dataJson = {}
                response["code"] = 200
                response["type"] = "Success"
                response["message"] = "Login succesfull"

                dataJson["username"] = data[0][1]

                response["data"] = dataJson
            else:
                response["code"] = 401
                response["type"] = "Error"
                response["message"] = "Username, password combination is wrong"
        else:
            response["code"] = 401
            response["type"] = "Error"
            response["message"] = "Username, password combination is wrong"
        return response

    def register(self, parametri):
        response = {}
        if db.checkIfUserExists(parametri["email"]):
            response["code"] = 409
            response["message"] = "Email already in use"
            response["type"] = "Error"
        else:
            db.insertUser(parametri["username"], parametri["password"], parametri["email"])
            response["code"] = 200
            response["message"] = "All is well"
            response["type"] = "Success"

        return response


os.chdir(os.path.join(os.path.dirname(__file__),'..','MVC',))
server = ServerConcurent(('localhost',4034), RequestHandler)
Thread(target=server.serve_forever).start()