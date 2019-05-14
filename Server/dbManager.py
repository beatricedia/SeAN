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
        querystring = "select * from allergies  order by id desc"
        cursor.execute(querystring)
        result = cursor.fetchall()
        return result


def formatAllSelectedAllergies():
        result = {}
        i = 0
        for allergy in  selectAllAllergies():
                # print(allergy)
                # result[allergy.__getitem__(0)] = list(allergy)
                i+=1
                result[i] =  list(allergy)
        
        return result


print(formatAllSelectedAllergies())

def insertAllergy(id, name, category, description, symptoms, prevention, treatment, medication):
    with connection.cursor() as cursor:
        querystring = "insert into allergies VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(querystring, (id, name, category, description,
                                     symptoms, prevention, treatment, medication))
        connection.commit()


# insertAllergy("id","name","category","description","symptoms","prevention","treatment","medication")
# insertAllergy("1","Soy","Food","Soy allergy is an exaggerated reaction of the immune system to soy consumption and foods containing soy. Usually, the reaction occurs as a result of the consumption of soy milk in childhood.",
# "rash, hives, pruritus around the mouth,sneezing,cramps,vomiting",
# "Remove products containing soy protein. Always take a self-injected syringe with epinephrine in case of a severe allergic reaction.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, the removal from food of products containing soy protein.",
# "Antihistamines, Epinephrine injectable")
# insertAllergy("2","Sun","Weather","Solar Allergy is a term used to describe a number of diseases characterized by the appearance of a pruritic eruption as a result of exposure to the sun. The most common form of sun allergy is polymorphic rash or summer prurigo, which usually occurs with the first exposure to the sun in the year and in many cases improves in the summer, once the skin is used to higher levels of UV radiation.",
# "redness, rash, pruritus",
# "It is important to avoid sudden and prolonged exposure to the sun (especially between 10 and 16 hours), and exposure to sunlight is recommended so that the skin can adapt. In addition, wearing suitable clothing - preferably UV-protected fabrics - and hats can help protect the skin against ultraviolet radiation.",
# "Applying photoprotective cream (with SPF minimum 30) and reappliing every 2 hours in case of prolonged exposure to sunlight, or even more often if we swim or sweat abundantly, is absolutely necessary to minimize damage from UV radiation.",
# "Photoprotective cream")
# insertAllergy("3","Nuts","Food","Peanut allergy is an exaggerated reaction of the immune system to the consumption of peanuts and foods containing peanuts.",
# "hives, itching, rash",
# "Even a little bit that you swallow or inhale could cause an allergic reaction. You know to avoid the obvious foods, such as almond butter, cookies with walnuts baked in, or oatmeal studded with pistachios.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.",
# "Antihistamines, Epinephrine injectable")
# insertAllergy("4","Eggs","Food","Egg allergy is an exaggerated reaction of the immune system to egg consumption and is one of the most common forms of allergy at children. Egg allergy occurs from early childhood and disappears to a large extent of children at adolescence.",
# "urticaria, vomiting, itching, nasal congestion, cramping",
# "Most people with egg allergies react to the egg whites, not the yolk. To be safe, don’t eat either part. Even if you separate them, the yolk is likely to have some of the white’s proteins in it. Also avoid eggs in other forms, such as: egg powder, dried eggs, egg solid.",
# "Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, removing food that contain eggs, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.",
# "Antihistamines, Epinephrine injectable")
# insertAllergy("5","Milk","Food","A milk allergy is when your immune system thinks dairy is a foreign invader and attacks it by releasing chemicals called histamines.",
# "wheezing, vomiting, diarrhea,irritability",
# "Find other ways to get vitamins and minerals. Foods such as broccoli, spinach, and soy products can help fill the void. A registered dietitian can help you develop a well-balanced eating plan. Try dairy substitutes. Drink soy, rice, and almond milk that are fortified with calcium and vitamin D. Avoid milk outside the kitchen. Check labels on cosmetics, creams, and ointments to see if they contain cow’s milk in any form.",
# "Avoiding complete exposure to milk and derivatives.",
# "Avoiding complete exposure to milk and derivatives.")
# insertAllergy("6","Animals","Respiratory","Most people are not allergic to animal fur, but rather to a protein found in the pet dander, saliva, and urine.",
# "runny nose, sneezing, watery eyes,coughing, dark circles under the eyes",
# "If you have a pet allergy and you’ll be visiting people who have cats or dogs, take your allergy medication with you and keep up with your immunotherapy before you go. Bring your own pillow with you, too.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy")
# insertAllergy("7","Mold","Respiratory","When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. This fungus thrives in damp, humid areas such as basements and bathrooms. When mold spores get into the air, they can trigger allergy symptoms.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy")
# insertAllergy("8","Dust mites","Respiratory","When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. These microscopic bugs flourish in mattresses and bedding. When their droppings and remains become airborne, they can cause allergy symptoms.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.",
# "Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.",
# "Antihistamines, Decongestants, Immunotherapy")
# insertAllergy("9","Pollen","Respiratory","As plants release pollen, millions of people start having hay fever. Trees, grasses, and weeds release these tiny grains into the air to fertilize other plants. When they get into the nose of someone who’s allergic, they send the body's defenses haywire. The immune system mistakenly sees the pollen as a danger and releases antibodies that attack the allergens.",
# "runny nose, sneezing, watery eyes, coughing, dark circles under the eyes",
# "It is advisable to keep the indoor air clean using a dehumidifier containing a filter to keep the pollen away from home. Also, in the season where allergies occur, it is advisable to keep doors and windows closed, not to leave the house on days when the wind blows strong or to wear a mask if you have to spend time outdoors.",
# "Immunotherapy gives you gradually increasing doses of the allergen until your body can handle it. The treatment can relieve your symptoms for a longer time than other types of allergy medications. ",
# "Antihistamines, Nasal spray, Eye drops, Nasal irrigation")
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

def insertUser(username,password,email):
        with connection.cursor() as cursor:
                querystring = "insert into users(username, password, email) VALUES(%s,%s,%s)"
                cursor.execute(querystring, (username,password,email))
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

def selectSpecificAllergy(id):
         with connection.cursor() as cursor:
                querystring = "select * from allergies where id = %s"
                cursor.execute(querystring, str(id))
                result = cursor.fetchall()
                return result
# print(selectSpecificAllergy(2))                

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
                cursor.execute(querystring, str(id))
                result = cursor.fetchall()
                return result  
def selectLastUserId():
        with connection.cursor() as cursor:
                querystring = "select max(id) from allergies"
                cursor.execute(querystring, str(id))
                result = cursor.fetchall()
                return result   
