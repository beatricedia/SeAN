import sys
import os
import json
import cgi

absFilePath = os.path.abspath(__file__)
Dir = os.path.dirname(os.path.abspath(__file__))
Dir = os.path.dirname(Dir)
Dir = os.path.dirname(Dir)

newPath = os.path.join(Dir, 'Server')

sys.path.insert(0, newPath)

import dbManager as db

print("Content-Type: text/html\n")
arguments = cgi.FieldStorage()

def getAllergy():
    return json.dumps(db.formatAllSelectedAllergies())
  

print(getAllergy())
