from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread

import time
import os
import json
import dbManager as db

anotimp = "summer"

mesajeNot = {
    "summer": {
        "mesaj": "Summer is here and bring the strong sun with it! The allergy arrive. Be carefoul!",
        "alergieID": 2,
        "interval": 3600
    },
    "spring": {
        "mesaj": "Primavara este aici. Aveti grija la polen",
        "alergieID": 9,
        "interval": 3600
    }
}


class ServerConcurent(HTTPServer):

    def process_request(self, request, client_address):
        Thread(target=self.requestNou, args=(
            self.RequestHandlerClass, request, client_address, self)).start()

    def requestNou(self, handlerClass, request, address, server):
        handlerClass(request, address, server)
        self.shutdown_request(request)


class RequestHandler(BaseHTTPRequestHandler):

    def setHeader(self, data):
        self.send_response(data["code"])
        self.send_header('Content-type', data["type"])
        self.end_headers()

    def genSetCookieCode(self, id):
        code = "\t<script>\n"
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
                data["file"] = bytes(json.dumps(
                    db.formatAllSelectedAllergies()), "utf-8")
            elif "alergie" in resursa:
                data["type"] = "text/html"
                pagina_creata = open("allergy.html", "r").read()
                pagina_creata = pagina_creata.replace(
                    "<!--replace me senpai-->", self.genSetCookieCode(resursa.replace("alergie", "")))
                data["file"] = bytes(pagina_creata, "utf-8")
            elif resursa == "user_allergies":
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(
                    db.formatAllergiesForUSers()), "utf-8")
            elif resursa == "suggestions":
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(
                    db.formatAllSelectedSuggestions()), "utf-8")
            elif "user_allergies_profile" in resursa:
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(db.formatAllergiesForUserProfile(
                    resursa.replace("user_allergies_profile", ""))), "utf-8")
            elif resursa == "gender-statistics":
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(
                    db.allergyStatistics()), "utf-8")
            elif "notificari" in resursa:
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(db.getNotificari(
                    resursa.replace("notificari", ""))), "utf-8")
                print(data["file"])
            elif "comments" in resursa:
                arg = resursa.replace("comments", "")
                print("Sa vedem", arg)
                data["type"] = "application/json"
                data["file"] = bytes(json.dumps(
                    db.formatComments(arg)), "utf-8")

            if resursa != "alergii" and "alergie" not in resursa and resursa != "suggestions" \
                    and resursa != "user_allergies" and "user_allergies_profile" not in resursa \
                    and "comments" not in resursa and "notificari" not in resursa and resursa != "gender-statistics":
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
        elif path == "add_allergy":
            data = self.add_allergy(parametri)
        elif path == "add_user_allergies":
            data = self.add_user_allergies(parametri)
        elif path == "validate":
            data = self.validate(parametri)
        elif path == "feedback":
            data = self.feedback(parametri)
        elif path == "setari":
            data = self.setari(parametri)
        elif path == "add_comment":
            data = self.comment(parametri)
        else:
            response = 404

        self.send_response(data["code"])
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(data), "UTF-8"))

    def validate(self, parametri):
        db.validate(parametri["id"])
        response = {}
        response["code"] = 200
        response["type"] = "Success"
        response["message"] = "Validation succesfull"
        return response

    def setari(self, parametri):
        db.saveSettings(parametri)
        response = {}
        response["code"] = 200
        response["type"] = "success"
        response["message"] = "Settings saved"
        return response

    def login(self, parametri):
        response = {}
        if db.validateTextSqlInjection(parametri["email"]) == True and db.validateTextSqlInjection(parametri["password"]) == True:
            if db.validateTextXss(parametri["email"]) == True and db.validateTextXss(parametri["password"]) == True:
                if db.checkIfUserExists(parametri["email"]):
                    if db.checkUserPassword(parametri["email"])[0][0] == parametri["password"]:
                        data = db.selectAllFromUser(parametri["email"])
                        dataJson = {}
                        response["code"] = 200
                        response["type"] = "Success"
                        response["message"] = "Login succesfull"

                        dataJson["username"] = data[0][1]
                        dataJson["id"] = data[0][0]
                        dataJson["notificare1"] = data[0][5]
                        dataJson["notificare2"] = data[0][6]
                        dataJson["notificare3"] = data[0][7]
                        response["data"] = dataJson

                    else:
                        response["code"] = 401
                        response["type"] = "Error"
                        response["message"] = "Username, password combination is wrong"
                else:
                    response["code"] = 401
                    response["type"] = "Error"
                    response["message"] = "Username, password combination is wrong"
            else:
                response["code"] = 409
                response["message"] = "You tried xss! Got ya'!"
                response["type"] = "Error"
        else:
            response["code"] = 409
            response["message"] = "You tried sql injection! Got ya'!"
            response["type"] = "Error"
        return response

    def register(self, parametri):
        response = {}
        if db.validateTextSqlInjection(parametri["email"]) == True and db.validateTextSqlInjection(parametri["password"]) == True and db.validateTextSqlInjection(parametri["sex"]) == True:
            if db.validateTextXss(parametri["email"]) == True and db.validateTextXss(parametri["password"]) == True and db.validateTextXss(parametri["sex"]) == True:
                if db.checkIfUserExists(parametri["email"]):
                    response["code"] = 409
                    response["message"] = "Email already in use"
                    response["type"] = "Error"
                else:
                    db.insertUser(
                        parametri["username"], parametri["password"], parametri["email"], parametri["sex"])
                    response["code"] = 200
                    response["message"] = "All is well"
                    response["type"] = "Success"
            else:
                response["code"] = 409
                response["message"] = "You tried xss! Got ya'!"
                response["type"] = "Error"
        else:
            response["code"] = 409
            response["message"] = "You tried sql injection! Got ya'!"
            response["type"] = "Error"

        return response

    def add_allergy(self, parametri):
        response = {}
        if db.validateTextSqlInjection(parametri['name']) == True and db.validateTextSqlInjection(parametri['description']) == True and db.validateTextSqlInjection(parametri['symptoms']) == True and db.validateTextSqlInjection(parametri['prevention']) == True and db.validateTextSqlInjection(parametri['treatment']) == True and db.validateTextSqlInjection(parametri['medication']) == True:
            if db.validateTextXss(parametri['name']) == True and db.validateTextXss(parametri['description']) == True and db.validateTextXss(parametri['symptoms']) == True and db.validateTextXss(parametri['prevention']) == True and db.validateTextXss(parametri['treatment']) == True and db.validateTextXss(parametri['medication']) == True:
                db.insertSuggestion(parametri['name'], parametri['allergy_type'], parametri['description'], parametri['symptoms'],
                                    parametri['prevention'], parametri['treatment'], parametri['medication'], parametri['id'])
                response["code"] = 200
                response["message"] = "All is well"
                response["type"] = "Success"
            else:
                response["code"] = 409
                response["message"] = "You tried xss! Got ya'!"
                response["type"] = "Error"
        else:
            response["code"] = 409
            response["message"] = "You tried sql injection! Got ya'!"
            response["type"] = "Error"
        return response

    def add_user_allergies(self, parametri):
        response = {}
        db.deleteUserAllergies(parametri['id'])
        for i in range(0, parametri['countAllergies']):
            db.insertUserAllergy(parametri['id'], parametri['allergiesId'][i])
        response["code"] = 200
        response["message"] = "All is well"
        response["type"] = "Success"

        return response

    def feedback(self, parametri):
        response = {}
        if db.validateTextSqlInjection(parametri['name']) == True and db.validateTextSqlInjection(parametri['email']) == True and db.validateTextSqlInjection(parametri['message']) == True:
            if db.validateTextXss(parametri['name']) == True and db.validateTextXss(parametri['email']) == True and db.validateTextXss(parametri['message']) == True:
                db.insertFeedback(parametri)
                response["code"] = 200
                response["message"] = "All is well"
                response["type"] = "Success"
            else:
                response["code"] = 409
                response["message"] = "You tried xss! Got ya'!"
                response["type"] = "Error"
        else:
            response["code"] = 409
            response["message"] = "You tried sql injection! Got ya'!"
            response["type"] = "Error"

        return response

    def comment(self, parametri):
        response = {}
        if db.validateTextSqlInjection(parametri['comment']) == True:
            if db.validateTextXss(parametri['comment']) == True:
                db.insertComment(parametri)
                response["code"] = 200
                response["message"] = "All is well"
                response["type"] = "Success"
            else:
                response["code"] = 409
                response["message"] = "You tried xss! Got ya'!"
                response["type"] = "Error"
        else:
            response["code"] = 409
            response["message"] = "You tried sql injection! Got ya'!"
            response["type"] = "Error"

        return response


os.chdir(os.path.join(os.path.dirname(__file__), '..', 'MVC',))
server = ServerConcurent(('localhost', 4034), RequestHandler)
Thread(target=server.serve_forever).start()


def notificari_add():
    while True:
        db.add_sesonal_notifications(mesajeNot[anotimp])
        time.sleep(mesajeNot[anotimp]["interval"])


Thread(target=notificari_add).start()
