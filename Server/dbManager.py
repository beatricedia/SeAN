import mysql.connector
import pymysql.cursors
import pymysql
from mysql.connector import (connection)


connection = pymysql.connect(host="127.0.0.1",
                             port=8001,
                             user="beatricedia",
                             password="Mysql112",
                             db="sean_db",
                             charset="utf8mb4")


def selectAllAllergies():
    with connection.cursor() as cursor:
        querystring = "select * from allergies"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


# print(selectAllAllergies())

def insertAllergy(id, name, category, description, symptoms, prevention, treatment, medication):
    with connection.cursor() as cursor:
        querystring = "insert into allergies VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(querystring, (id, name, category, description,
                                     symptoms, prevention, treatment, medication))
        connection.commit()


# insertAllergy("2","Sun","Weather","Descriere","hapciu","medicamente","Nurofren","altceva")
# print(selectAllAllergies())


def deleteAllergy(id):
    with connection.cursor() as cursor:
        querystring = "delete from allergies WHERE id = %s"
        cursor.execute(querystring, str(id))
        connection.commit()

# deleteAllergy(2)
# print(selectAllAllergies())

def selectAllUsers():
    with connection.cursor() as cursor:
        querystring = "select * from users"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result

def insertUser(id,username,password,email):
        with connection.cursor() as cursor:
                querystring = "insert into users VALUES(%s,%s,%s,%s)"
                cursor.execute(querystring, (id,username,password,email))
                connection.commit()

# insertUser("1","ioneel","ceva","ionfrumosu@gmail.com")
# print(selectAllUsers())

def deleteUser(id):
        with connection.cursor() as cursor:
                querystring = "delete from users WHERE id = %s"
                cursor.execute(querystring, str(id))
                connection.commit()
# deleteUser(1)
# print(selectAllUsers())

def selectAllSuggestions():
    with connection.cursor() as cursor:
        querystring = "select * from suggestions"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result

def insertSuggestion(id_suggestion,id_user,category,name,symptoms,prevention,treatment,medication,ok):
        with connection.cursor() as cursor:
                querystring = "insert into suggestions VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                cursor.execute(querystring, (id_suggestion,id_user,category,name,symptoms,prevention,treatment,medication,ok))
                connection.commit()

# insertSuggestion("1","2","Weather","Sun","hapciu","medicamente","Nurofren","altceva","0")
# print(selectAllSuggestions())

def deleteSuggestion(id):
        with connection.cursor() as cursor:
                querystring = "delete from suggestions WHERE id_suggestion = %s"
                cursor.execute(querystring, str(id))
                connection.commit()
# deleteSuggestion(1)
# print(selectAllSuggestions())

def selectAllUserAllergy():
        with connection.cursor() as cursor:
                querystring = "select * from user_allergy"
                cursor.execute(querystring)
                result = cursor.fetchall()
                return result

def insertUserAllergy(id_user,id_allergy):
        with connection.cursor() as cursor:
                querystring = "insert into user_allergy VALUES(%s,%s)"
                cursor.execute(querystring, (id_user,id_allergy))
                connection.commit()

# insertUserAllergy("1","2")
# print(selectAllUserAllergy())