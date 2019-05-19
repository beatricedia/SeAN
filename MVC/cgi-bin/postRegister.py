import os
import sys
import cgi
import re
import cgitb
import json

absFilePath = os.path.abspath(__file__)
Dir = os.path.dirname(os.path.abspath(__file__))
Dir = os.path.dirname(Dir)
Dir = os.path.dirname(Dir)

newPath = os.path.join(Dir, 'Server')

sys.path.insert(0, newPath)

print("Content-Type: text/html\n")
arguments = cgi.FieldStorage()


def returnErrorMessage(text):
    response = {}
    response['type'] = 'error'
    response['message'] = text
    print(json.dumps(response))
    exit(0)

def returnSuccesMessage():
    response = {}
    response['type'] = 'success'
    response['message'] = 'Your submission has been uploaded to our database.'
    print(json.dumps(response))
    exit(0)


jsonObj = {}
if 'json' not in arguments.keys():
    returnErrorMessage("No JSON found.")
jsonObj = json.loads(arguments['json'].value.encode('utf-8'))    


# partea de validare dupa

username = jsonObj['username']
password = jsonObj['password']
email = jsonObj['email']
# weatherAllergy = jsonObj['weatherAllergy']
# respiratoryAllergy = jsonObj['respiratoryAllergy']
# foodAllergy = jsonObj['foodAllergy']
otherAllergy = jsonObj['otherAllergy']


import dbManager as db
db.insertUser(username,password,email)