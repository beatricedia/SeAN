import mysql.connector
import pymysql.cursors
import pymysql
import smtplib
import random
import re
from mysql.connector import (connection)


connection = pymysql.connect(host="127.0.0.1",
                             port=8001,
                             user="beatricedia",
                             password="Mysql112",
                             db="sean_db",
                             charset="utf8mb4")


def selectAllAllergies():
    with connection.cursor() as cursor:
        querystring = "select * from allergies where validation=1 order by id desc "
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def formatAllSelectedAllergies():
    result = {}
    i = 0
    for allergy in selectAllAllergies():
        i += 1
        result[i] = list(allergy)

    return result


def insertAllergy(id, name, category, description, symptoms, prevention, treatment, medication, years, people, age, percent):
    with connection.cursor() as cursor:
        querystring = "insert into allergies VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(querystring, (id, name, category, description,
                                     symptoms, prevention, treatment, medication, years, people, age, percent))
        connection.commit()


# insertAllergy("id","name","category","description","symptoms","prevention","treatment","medication","years","people","age","percent")
# insertAllergy("1","Soy","Food","Soy allergy is an exaggerated reaction of the immune system to soy consumption and foods containing soy. Usually, the reaction occurs as a result of the consumption of soy milk in childhood.",
# "rash, hives, pruritus around the mouth,sneezing,cramps,vomiting",
# "Remove products containing soy protein. Always take a self-injected syringe with epinephrine in case of a severe allergic reaction.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, the removal from food of products containing soy protein.",
# "Antihistamines, Epinephrine injectable","2010,2012,2015,2016,2017,2018,2019","50,63,67,66,70,72,71","0-3,4-7,8-15,16-20,21-30,31-70","3,5,3,4,7,10")
# insertAllergy("2","Sun","Weather","Solar Allergy is a term used to describe a number of diseases characterized by the appearance of a pruritic eruption as a result of exposure to the sun. The most common form of sun allergy is polymorphic rash or summer prurigo, which usually occurs with the first exposure to the sun in the year and in many cases improves in the summer, once the skin is used to higher levels of UV radiation.",
# "redness, rash, pruritus",
# "It is important to avoid sudden and prolonged exposure to the sun (especially between 10 and 16 hours), and exposure to sunlight is recommended so that the skin can adapt. In addition, wearing suitable clothing - preferably UV-protected fabrics - and hats can help protect the skin against ultraviolet radiation.",
# "Applying photoprotective cream (with SPF minimum 30) and reappliing every 2 hours in case of prolonged exposure to sunlight, or even more often if we swim or sweat abundantly, is absolutely necessary to minimize damage from UV radiation.",
# "Photoprotective cream","2010,2012,2015,2016,2017,2018,2019","45,57,61,63,70,77,62","0-3,4-7,8-15,16-20,21-30,31-70","1,3,5,2,5,6")
# insertAllergy("3","Nuts","Food","Peanut allergy is an exaggerated reaction of the immune system to the consumption of peanuts and foods containing peanuts.",
# "hives, itching, rash",
# "Even a little bit that you swallow or inhale could cause an allergic reaction. You know to avoid the obvious foods, such as almond butter, cookies with walnuts baked in, or oatmeal studded with pistachios.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.",
# "Antihistamines, Epinephrine injectable","2010,2012,2015,2016,2017,2018,2019","42,36,37,45,46,49,50","0-3,4-7,8-15,16-20,21-30,31-70","2,4,5,7,9,10")
# insertAllergy("4","Eggs","Food","Egg allergy is an exaggerated reaction of the immune system to egg consumption and is one of the most common forms of allergy at children. Egg allergy occurs from early childhood and disappears to a large extent of children at adolescence.",
# "urticaria, vomiting, itching, nasal congestion, cramping",
# "Most people with egg allergies react to the egg whites, not the yolk. To be safe, don’t eat either part. Even if you separate them, the yolk is likely to have some of the white’s proteins in it. Also avoid eggs in other forms, such as: egg powder, dried eggs, egg solid.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, removing food that contain eggs, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.",
# "Antihistamines, Epinephrine injectable","2010,2012,2015,2016,2017,2018,2019","39,40,42,45,48,53,60","0-3,4-7,8-15,16-20,21-30,31-70","6,12,10,5,10,12")
# insertAllergy("5","Milk","Food","A milk allergy is when your immune system thinks dairy is a foreign invader and attacks it by releasing chemicals called histamines.",
# "wheezing, vomiting, diarrhea,irritability",
# "Find other ways to get vitamins and minerals. Foods such as broccoli, spinach, and soy products can help fill the void. A registered dietitian can help you develop a well-balanced eating plan. Try dairy substitutes. Drink soy, rice, and almond milk that are fortified with calcium and vitamin D. Avoid milk outside the kitchen. Check labels on cosmetics, creams, and ointments to see if they contain cow’s milk in any form.",
# "Avoiding complete exposure to milk and derivatives.",
# "Avoiding complete exposure to milk and derivatives.","2010,2012,2015,2016,2017,2018,2019","45,48,46,50,51,53,54","0-3,4-7,8-15,16-20,21-30,31-70","2,5,4,2,7,10")
# insertAllergy("6","Animals","Respiratory","Most people are not allergic to animal fur, but rather to a protein found in the pet dander, saliva, and urine.",
# "runny nose, sneezing, watery eyes,coughing, dark circles under the eyes",
# "If you have a pet allergy and you’ll be visiting people who have cats or dogs, take your allergy medication with you and keep up with your immunotherapy before you go. Bring your own pillow with you, too.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy","2010,2012,2015,2016,2017,2018,2019","70,79,85,90,99","0-3,4-7,8-15,16-20,21-30,31-70","5,8,7,6,12,10")
# insertAllergy("7","Mold","Respiratory","When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. This fungus thrives in damp, humid areas such as basements and bathrooms. When mold spores get into the air, they can trigger allergy symptoms.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy", "2010,2012,2015,2016,2017,2018,2019","89,90,95,102,105,103,100","0-3,4-7,8-15,16-20,21-30,31-70","7,9,8,12,15,10")
# insertAllergy("8","Dust mites","Respiratory","When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. These microscopic bugs flourish in mattresses and bedding. When their droppings and remains become airborne, they can cause allergy symptoms.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy","2010,2012,2015,2016,2017,2018,2019","104,108,115,123,127,130,135","0-3,4-7,8-15,16-20,21-30,31-70","4,15,13,14,17,10")
# insertAllergy("9","Pollen","Respiratory","As plants release pollen, millions of people start having hay fever. Trees, grasses, and weeds release these tiny grains into the air to fertilize other plants. When they get into the nose of someone who’s allergic, they send the body's defenses haywire. The immune system mistakenly sees the pollen as a danger and releases antibodies that attack the allergens.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "It is advisable to keep the indoor air clean using a dehumidifier containing a filter to keep the pollen away from home. Also, in the season where allergies occur, it is advisable to keep doors and windows closed, not to leave the house on days when the wind blows strong or to wear a mask if you have to spend time outdoors.",
# "Immunotherapy gives you gradually increasing doses of the allergen until your body can handle it. The treatment can relieve your symptoms for a longer time than other types of allergy medications. ",
# "Antihistamines, Nasal spray, Eye drops, Nasal irrigation","2010,2012,2015,2016,2017,2018,2019","150,143,148,151,157,160,173","0-3,4-7,8-15,16-20,21-30,31-70","2,15,23,27,17,25")
# print(selectAllAllergies())


def deleteAllergy(id):
    with connection.cursor() as cursor:
        querystring = "delete from allergies WHERE id = %s"
        cursor.execute(querystring, str(id))
        connection.commit()


def deleteUserAllergies(id):
    with connection.cursor() as cursor:
        querystring = "delete from user_allergy WHERE id_user = %s"
        cursor.execute(querystring, str(id))
        connection.commit()

def selectAllUsers():
    with connection.cursor() as cursor:
        querystring = "select * from users"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def insertUser(username, password, email, sex):
    with connection.cursor() as cursor:
        random = 1
        querystring = "insert into users(username, password, email, sex) VALUES(%s,%s,%s,%s)"
        cursor.execute(querystring, (username, password, email, sex))
        connection.commit()

def deleteUser(id):
    with connection.cursor() as cursor:
        querystring = "delete from users WHERE id = %s"
        cursor.execute(querystring, str(id))
        connection.commit()

def selectAllSuggestions():
    with connection.cursor() as cursor:
        querystring = "select * from allergies where validation<>1"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def formatAllSelectedSuggestions():
    result = {}
    i = 0
    for allergy in selectAllSuggestions():
        i += 1
        result[i] = list(allergy)

    return result


def insertSuggestion(name, category, description, symptoms, prevention, treatment, medication, id_user):
    with connection.cursor() as cursor:
        querystring = "select max(id) from allergies"
        cursor.execute(querystring)
        id = int(cursor.fetchone()[0]) + 1
        id = str(id)
        querystring = "insert into allergies (id, name, category, description, symptoms, prevention, " \
                      "treatment, medication,user_id, validation) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(querystring, (id, name, category, description,
                                     symptoms, prevention, treatment, medication, id_user, 0))
        connection.commit()

def deleteSuggestion(id):
    with connection.cursor() as cursor:
        querystring = "delete from suggestions WHERE id_suggestion = %s"
        cursor.execute(querystring, str(id))
        connection.commit()

def selectAllUserAllergy():
    with connection.cursor() as cursor:
        querystring = "select * from user_allergy"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def insertUserAllergy(id_user, id_allergy):
    with connection.cursor() as cursor:
        querystring = "insert into user_allergy VALUES(%s,%s)"
        cursor.execute(querystring, (id_user, id_allergy))
        connection.commit()

def seletUserAllergies(id_user):
    with connection.cursor() as cursor:
        querystring = "delete from user_allergy WHERE id_user = %s"
        cursor.execute(querystring, str(id_user))
        connection.commit()


def selectSpecificAllergy(id):
    with connection.cursor() as cursor:
        querystring = "select * from allergies where id = %s"
        cursor.execute(querystring, str(id))
        result = cursor.fetchall()
        return result

def selectSpecificUser(id):
    with connection.cursor() as cursor:
        querystring = "select * from users where id = %s"
        cursor.execute(querystring, str(id))
        result = cursor.fetchall()
        return result


def selectUserAllergy(id_user):
    with connection.cursor() as cursor:
        querystring = "select * from users where id_user= %s"
        cursor.execute(querystring, str(id))
        result = cursor.fetchall()
        return result


def selectLastAllergyId():
    with connection.cursor() as cursor:
        querystring = "select max(id) from allergies"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result[0][0]


def selectLastUserId():
    with connection.cursor() as cursor:
        querystring = "select max(id) from allergies"
        cursor.execute(querystring, str(id))
        result = cursor.fetchall()
        return result


def checkIfUserExists(email):
    with connection.cursor() as cursor:
        querystring = "select email from users where email = %s"
        rows_count = cursor.execute(querystring, str(email))
        if rows_count > 0:
            rs = cursor.fetchall()
            return rs
        else:
            return 0


def checkUserPassword(email):
    with connection.cursor() as cursor:
        querystring = "select password from users where email = %s"
        rows_count = cursor.execute(querystring, str(email))
        if rows_count > 0:
            rs = cursor.fetchall()
            return rs
        else:
            return 0


def selectAllFromUser(email):
    with connection.cursor() as cursor:
        querystring = "select * from users where email = %s"
        rows_count = cursor.execute(querystring, str(email))
        if rows_count > 0:
            rs = cursor.fetchall()
            return rs
        else:
            return 0


def selectAllergiesForUsers():
    with connection.cursor() as cursor:
        querystring = "select * from allergies where validation=1 "
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def formatAllergiesForUSers():
    result = {}
    i = 0
    for allergy in selectAllergiesForUsers():
        i += 1
        result[i] = list(allergy)
    return result


def getNotificari(userID):
    with connection.cursor() as cursor:
        querystring = "SELECT * from notifications where id_user=%s;"
        cursor.execute(querystring, (userID))
        rezultat = cursor.fetchall()

        querystring = "DELETE FROM notifications where id_user=%s;"
        cursor.execute(querystring, (userID))
        connection.commit()
        return rezultat


def notify(userID, mesaj, type):
    with connection.cursor() as cursor:
        querystring = "INSERT into notifications(id_user,mesaj,tip) VALUES(%s, %s, %s);"
        cursor.execute(querystring, (userID, mesaj, type))
        connection.commit()

    with connection.cursor() as cursor:
        querystring = "select email from users where id=%s "
        cursor.execute(querystring, userID)
        email = cursor.fetchone()

    server = smtplib.SMTP('smtp.gmail.com', 25)
    server.connect("smtp.gmail.com", 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login("seallergy.notifications", "web2019!")
    text = mesaj
    server.sendmail("seallergy.notifications@gmail.com", email, text)
    server.quit()


def validate(id):
    with connection.cursor() as cursor:
        querystring = "UPDATE allergies SET validation=1 WHERE id= %s"
        cursor.execute(querystring, str(id))
        connection.commit()
    with connection.cursor() as cursor:
        querystring = "SELECT name, category from allergies where id=%s"
        cursor.execute(querystring, id)
        rezultat = cursor.fetchall()[0]
        print(rezultat)
    usersToNotify = selectUsersByCategoryAllergy(id)
    for i in usersToNotify:
        userID = i[0]
        notify(userID, "New allergy added! \nCategory: " +
               rezultat[1] + "\nName: "+rezultat[0], 1)


def saveNotifications(userID, val1, val2, val3):
    with connection.cursor() as cursor:
        querystring = "UPDATE users SET notificare1=%s, notificare2=%s, notificare3=%s WHERE id=%s;"
        cursor.execute(querystring, (val1, val2, val3, userID))
        connection.commit()


def saveAllergies(userID, allergies):

    with connection.cursor() as cursor:
        querystring = "DELETE FROM user_allergy where id_user=%s"
        cursor.execute(querystring, (userID))
        for i in allergies:
            print(i)
            querystring = "INSERT INTO user_allergy(id_user, id_allergy) VALUES(%s, %s);"
            cursor.execute(querystring, (userID, i))
        connection.commit()


def saveSettings(parametri):

    userId = parametri["id"]
    notificare1 = parametri["notificare1"]
    notificare2 = parametri["notificare2"]
    notificare3 = parametri["notificare3"]
    allergies = parametri["alergii"]
    saveNotifications(userId, notificare1, notificare2, notificare3)
    saveAllergies(userId, allergies)


def selectAllergiesForUserProfile(id):
    with connection.cursor() as cursor:
        querystring = "SELECT *,(SELECT COUNT(*) from user_allergy where id_allergy=id and id_user = " + \
            id + ") FROM sean_db.allergies where validation = 1;"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def formatAllergiesForUserProfile(id):
    result = {}
    i = 0
    for allergy in selectAllergiesForUserProfile(id):
        i += 1
        result[i] = list(allergy)
    return result


def nrOfAllergies():
    with connection.cursor() as cursor:
        querystring = "select count(id) from allergies where validation=1"
        cursor.execute(querystring)
        result = cursor.fetchone()
        return result[0]


def selectUsersByCategoryAllergy(id_allergy):
    with connection.cursor() as cursor:
        querystring = "SELECT distinct id_user FROM user_allergy as ua inner join allergies as a " \
                      "where ua.id_allergy = a.id and category = ( SELECT category from allergies where id = %s) " \
                      "and a.validation = 1"
        cursor.execute(querystring, str(id_allergy))
        result = cursor.fetchall()
        return result


def insertFeedback(parametri):
    with connection.cursor() as cursor:
        querystring = "insert into feedback(id_user, name, email, rating, message) VALUES(%s,%s,%s,%s,%s)"
        cursor.execute(querystring, (parametri["id_user"], parametri["name"],
                                     parametri["email"], parametri["rating"], parametri["message"]))
        connection.commit()

# comments

def insertComment(parametri):
    with connection.cursor() as cursor:
        querystring = "insert into comments(username, allergy_name, comment) VALUES(%s,%s,%s)"
        cursor.execute(
            querystring, (parametri["username"], parametri["allergy_name"], parametri["comment"]))
        connection.commit()

    with connection.cursor() as cursor:

        querystring = "select id_user from user_allergy where id_allergy = (select id from allergies where name=%s)"
        cursor.execute(querystring, parametri["allergy_name"])
        result = cursor.fetchall()

        querystring = "select id from users where username=%s"
        cursor.execute(querystring, parametri["username"])
        user = cursor.fetchone()[0]
        mesaj = "New comment added on " + \
            str(parametri["allergy_name"]) + " allergy"

        ids = list(sum(result, ()))
        for id_user in ids:
            if user != id_user:
                with connection.cursor() as cursor:
                    querystring = "insert into notifications(id_user, mesaj, tip) VALUES(%s,%s,%s)"
                    cursor.execute(querystring, (str(id_user), mesaj, 2))
                    connection.commit()


def selectComments(allergy_name):
    with connection.cursor() as cursor:
        querystring = "select username, comment from comments where allergy_name=%s "
        cursor.execute(querystring, allergy_name)
        result = cursor.fetchall()
        return result


def formatComments(allergy_name):
    result = {}
    i = 0
    for comment in selectComments(allergy_name):
        i += 1
        result[i] = list(comment)
    return result

# Application report

def checkIfAllergyExists(id):
    with connection.cursor() as cursor:
        querystring = "select name from allergies where id = %s and validation=1"
        rows_count = cursor.execute(querystring, str(id))
        if rows_count > 0:
            rs = cursor.fetchall()
            return 1
        else:
            return 0

def selectFemale():
    with connection.cursor() as cursor:
        querystring = "select * from users where sex=0000000001 "
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result

def selectFemaleID():
    result = []
    i = 0
    for value in selectFemale():
        result.append(value[0])
    return result

def findUser(id):
    resultList = []
    with connection.cursor() as cursor:
        querystring = "select id_allergy from user_allergy where id_user =%s "
        cursor.execute(querystring, id)
        result = cursor.fetchall()
        for value in result:
            resultList.append(value[0])
        return resultList


def selectFemaleAllergy():
    resultList = []
    for value in selectFemaleID():
        for item in findUser(value):
            resultList.append(item)
    return resultList


def selectAllergyName(id):
    with connection.cursor() as cursor:
        querystring = "select name from allergies where id =%s "
        cursor.execute(querystring, id)
        result = cursor.fetchone()
        return result[0]

def allergyFemaleStatistics():
    femaleList = selectFemaleAllergy()
    resultList = []
    for i in range(0, selectLastAllergyId()):
        resultList.append(0)
    for item in femaleList:
        for i, value in enumerate(resultList):
            if checkIfAllergyExists(i+1) == 1:
                if item-1 == i:
                    resultList[i] += 1
            else:
                resultList[i] = -1
    for i, value in enumerate(resultList):
        if resultList[i] != -1:
            resultList[i] = [selectAllergyName(i+1), value]
    resultList = list(filter(lambda a: a != -1, resultList))
    return(resultList)

def selectMale():
    with connection.cursor() as cursor:
        querystring = "select * from users where sex=0000000000 "
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result

def selectMaleID():
    result = []
    i = 0
    for value in selectMale():
        result.append(value[0])
    return result

def selectMaleAllergy():
    resultList = []
    for value in selectMaleID():
        for item in findUser(value):
            resultList.append(item)
    return resultList

def allergyMaleStatistics():
    maleList = selectMaleAllergy()
    resultList = []
    for i in range(0, selectLastAllergyId()):
        resultList.append(0)
    for item in maleList:
        for i, value in enumerate(resultList):
            if checkIfAllergyExists(i+1) == 1:
                if item-1 == i:
                    resultList[i] += 1
            else:
                resultList[i] = -1
    for i, value in enumerate(resultList):
        if resultList[i] != -1:
            resultList[i] = [selectAllergyName(i+1), value]
    resultList = list(filter(lambda a: a != -1, resultList))
    return(resultList)


def allergyStatistics():
    dictResult = {}
    femaleList = allergyFemaleStatistics()
    maleList = allergyMaleStatistics()
    dictResult["1"] = femaleList
    dictResult["2"] = maleList
    return dictResult

#Sql injection an xss validator

def validateTextSqlInjection(textToCheck):
    pattern = re.compile(
        r"('(''|[^'])*')|(;)|(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)  ")
    if (pattern.match(textToCheck)) or (re.findall(pattern, textToCheck)):
        return False
    else:
        return True

def validateTextXss(text):
    if re.search(r'<(|\/|[^\/>][^>]+|\/[^>][^>]+)>', text):
        return False
    return True

#Notification

def add_spring_notification():
    with connection.cursor() as cursor:
        querystring = "select id from users where id in (select id_user from user_allergy " \
                      "where id_allergy = ( select id_allergy from allergies where name = \"Pollen\")) "
        cursor.execute(querystring)
        result = cursor.fetchall()
        result = list(sum(result, ()))
        mesaj = "Atentie! Primavara este sezonul alergiilor la polen! "
    for id in result:
        with connection.cursor() as cursor:
            querystring = "insert into notifications(id_user, mesaj, tip) values(%s,%s,%s)"
            cursor.execute(querystring, (str(id), mesaj, 2))
            connection.commit()

def add_summer_notification():
    with connection.cursor() as cursor:
        querystring = "select id from users where id in (select id_user from user_allergy " \
                      "where id_allergy = ( select id_allergy from allergies where name = \"Sun\")) "
        cursor.execute(querystring)

        result = cursor.fetchall()
        result = list(sum(result, ()))
        mesaj = "Atentie! Vine vara, stati la umbra! "

    for id in result:
        with connection.cursor() as cursor:
            querystring = "insert into notifications(id_user, mesaj, tip) values(%s,%s,%s)"
            cursor.execute(querystring, (str(id), mesaj, 2))
            connection.commit()

def add_sesonal_notifications(seson):
    with connection.cursor() as cursor:

        querystring = "delete from notifications where tip=3"
        cursor.execute(querystring)

        querystring = "select distinct id_user from user_allergy where id_allergy = %s "
        cursor.execute(querystring, seson["alergieID"])

        result = cursor.fetchall()
        result = list(sum(result, ()))

        for id in result:
            querystring = "insert into notifications(id_user, mesaj, tip) values(%s, %s, %s)"
            cursor.execute(querystring, (id, seson["mesaj"], 3))

    connection.commit()
