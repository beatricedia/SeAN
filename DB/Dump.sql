-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sean_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `allergies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `symptoms` varchar(500) DEFAULT NULL,
  `prevention` varchar(500) DEFAULT NULL,
  `treatment` varchar(500) DEFAULT NULL,
  `medication` varchar(500) DEFAULT NULL,
  `years` varchar(500) DEFAULT NULL,
  `people` varchar(500) DEFAULT NULL,
  `age` varchar(500) DEFAULT NULL,
  `percent` varchar(500) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `validation` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (1,'Soy','Food','Soy allergy is an exaggerated reaction of the immune system to soy consumption and foods containing soy. Usually, the reaction occurs as a result of the consumption of soy milk in childhood.','rash, hives, pruritus around the mouth,sneezing,cramps,vomiting','Remove products containing soy protein. Always take a self-injected syringe with epinephrine in case of a severe allergic reaction.','Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, the removal from food of products containing soy protein.','Antihistamines, Epinephrine injectable','2010,2012,2015,2016,2017,2018,2019','50,63,67,66,70,72,71','0-3,4-7,8-15,16-20,21-30,31-70','3,5,3,4,7,10',0,1),(2,'Sun','Weather','Solar Allergy is a term used to describe a number of diseases characterized by the appearance of a pruritic eruption as a result of exposure to the sun. The most common form of sun allergy is polymorphic rash or summer prurigo, which usually occurs with the first exposure to the sun in the year and in many cases improves in the summer, once the skin is used to higher levels of UV radiation.','redness, rash, pruritus','It is important to avoid sudden and prolonged exposure to the sun (especially between 10 and 16 hours), and exposure to sunlight is recommended so that the skin can adapt. In addition, wearing suitable clothing - preferably UV-protected fabrics - and hats can help protect the skin against ultraviolet radiation.','Applying photoprotective cream (with SPF minimum 30) and reappliing every 2 hours in case of prolonged exposure to sunlight, or even more often if we swim or sweat abundantly, is absolutely necessary to minimize damage from UV radiation.','Photoprotective cream','2010,2012,2015,2016,2017,2018,2019','45,57,61,63,70,77,62','0-3,4-7,8-15,16-20,21-30,31-70','1,3,5,2,5,6',0,1),(3,'Nuts','Food','Peanut allergy is an exaggerated reaction of the immune system to the consumption of peanuts and foods containing peanuts.','hives, itching, rash','Even a little bit that you swallow or inhale could cause an allergic reaction. You know to avoid the obvious foods, such as almond butter, cookies with walnuts baked in, or oatmeal studded with pistachios.','Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.','Antihistamines, Epinephrine injectable','2010,2012,2015,2016,2017,2018,2019','42,36,37,45,46,49,50','0-3,4-7,8-15,16-20,21-30,31-70','2,4,5,7,9,10',0,1),(4,'Eggs','Food','Egg allergy is an exaggerated reaction of the immune system to egg consumption and is one of the most common forms of allergy at children. Egg allergy occurs from early childhood and disappears to a large extent of children at adolescence.','urticaria, vomiting, itching, nasal congestion, cramping','Most people with egg allergies react to the egg whites, not the yolk. To be safe, don’t eat either part. Even if you separate them, the yolk is likely to have some of the white’s proteins in it. Also avoid eggs in other forms, such as: egg powder, dried eggs, egg solid.','Administration of antihistamines, treatment of epinephrine injectable anaphylaxis, removing food that contain eggs, acupuncture, reflexology, horseradish that reduce nasal secretions, chamomile tea.','Antihistamines, Epinephrine injectable','2010,2012,2015,2016,2017,2018,2019','39,40,42,45,48,53,60','0-3,4-7,8-15,16-20,21-30,31-70','6,12,10,5,10,12',0,1),(5,'Milk','Food','A milk allergy is when your immune system thinks dairy is a foreign invader and attacks it by releasing chemicals called histamines.','wheezing, vomiting, diarrhea,irritability','Find other ways to get vitamins and minerals. Foods such as broccoli, spinach, and soy products can help fill the void. A registered dietitian can help you develop a well-balanced eating plan. Try dairy substitutes. Drink soy, rice, and almond milk that are fortified with calcium and vitamin D. Avoid milk outside the kitchen. Check labels on cosmetics, creams, and ointments to see if they contain cow’s milk in any form.','Avoiding complete exposure to milk and derivatives.','Avoiding complete exposure to milk and derivatives.','2010,2012,2015,2016,2017,2018,2019','45,48,46,50,51,53,54','0-3,4-7,8-15,16-20,21-30,31-70','2,5,4,2,7,10',0,1),(6,'Animals','Respiratory','Most people are not allergic to animal fur, but rather to a protein found in the pet dander, saliva, and urine.','runny nose, sneezing, watery eyes,coughing, dark circles under the eyes','If you have a pet allergy and you’ll be visiting people who have cats or dogs, take your allergy medication with you and keep up with your immunotherapy before you go. Bring your own pillow with you, too.','Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.','Antihistamines, Decongestants, Immunotherapy','2010,2012,2015,2016,2017,2018,2019','70,79,85,90,99','0-3,4-7,8-15,16-20,21-30,31-70','5,8,7,6,12,10',0,1),(7,'Mold','Respiratory','When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. This fungus thrives in damp, humid areas such as basements and bathrooms. When mold spores get into the air, they can trigger allergy symptoms.','runny nose, sneezing, watery eyes, coughing, dark circles under the eyes','Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.','Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.','Antihistamines, Decongestants, Immunotherapy','2010,2012,2015,2016,2017,2018,2019','89,90,95,102,105,103,100','0-3,4-7,8-15,16-20,21-30,31-70','7,9,8,12,15,10',0,1),(8,'Dust mites','Respiratory','When it gets cold and your furnace kicks on, it sends dust, mold spores, and insect parts into the air. They can get into your nose and launch a reaction. These microscopic bugs flourish in mattresses and bedding. When their droppings and remains become airborne, they can cause allergy symptoms.','runny nose, sneezing, watery eyes, coughing, dark circles under the eyes','Throw out shower curtains, wallpaper, and carpeting that have mold. Wash showers and sinks with a solution containing bleach and a little detergent. To help control mold, use a dehumidifier to keep the humidity in your home below 50%. Use a HEPA air filter to clean dust from the air. Wash bedding in hot water (130 F) each week.','Antihistamines , which reduce sneezing, sniffling, and itching. Decongestants , which clear mucus to relieve congestion and swelling. Immunotherapy (allergy shots or under-the-tongue tablets), which expose your body to gradually bigger doses of the allergen. This approach can curb your symptoms for a longer period of time than allergy drugs.','Antihistamines, Decongestants, Immunotherapy','2010,2012,2015,2016,2017,2018,2019','104,108,115,123,127,130,135','0-3,4-7,8-15,16-20,21-30,31-70','4,15,13,14,17,10',0,1),(9,'Pollen','Respiratory','As plants release pollen, millions of people start having hay fever. Trees, grasses, and weeds release these tiny grains into the air to fertilize other plants. When they get into the nose of someone who’s allergic, they send the body\'s defenses haywire. The immune system mistakenly sees the pollen as a danger and releases antibodies that attack the allergens.','runny nose, sneezing, watery eyes, coughing, dark circles under the eyes','It is advisable to keep the indoor air clean using a dehumidifier containing a filter to keep the pollen away from home. Also, in the season where allergies occur, it is advisable to keep doors and windows closed, not to leave the house on days when the wind blows strong or to wear a mask if you have to spend time outdoors.','Immunotherapy gives you gradually increasing doses of the allergen until your body can handle it. The treatment can relieve your symptoms for a longer time than other types of allergy medications. ','Antihistamines, Nasal spray, Eye drops, Nasal irrigation','2010,2012,2015,2016,2017,2018,2019','150,143,148,151,157,160,173','0-3,4-7,8-15,16-20,21-30,31-70','2,15,23,27,17,25',0,1),(26,'alergie noua','Weather','descriere','simptome','preventie','tratament','medicamentatie',NULL,NULL,NULL,NULL,1,1);
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comments` (
  `id_com` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `allergy_name` varchar(45) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_com`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (15,'admin','Pollen','Comentariu 1'),(16,'admin','Dust mites','Comentariul 1 Dust'),(17,'admin','Mold','Comentariu 1 Mold');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `feedback` (
  `id_feedback` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_feedback`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,NULL,NULL,1,'test'),(3,1,'george','george@sofian.ro',4,'I like IT'),(4,1,'geo','george@sofian.ro',1,'test');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notifications` (
  `id` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `mesaj` varchar(250) NOT NULL,
  `tip` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (NULL,8,'New allergy added! \nCategory: WeatherName: alergie noua',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_allergy`
--

DROP TABLE IF EXISTS `user_allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_allergy` (
  `id_user` int(11) NOT NULL,
  `id_allergy` int(11) NOT NULL,
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_allergy`
--

LOCK TABLES `user_allergy` WRITE;
/*!40000 ALTER TABLE `user_allergy` DISABLE KEYS */;
INSERT INTO `user_allergy` VALUES (7,4),(7,5),(7,7),(7,6),(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,22),(1,23),(1,24),(8,1),(8,2);
/*!40000 ALTER TABLE `user_allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `sex` int(10) unsigned zerofill DEFAULT NULL,
  `notificare1` int(11) DEFAULT NULL,
  `notificare2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','4194d1706ed1f408d5e02d672777019f4d5385c766a8c6ca8acba3167d36a7b97095','admin@sean.com',NULL,1,0),(7,'george','0522a55e2d5f0993a3d66d28864b2862a7218a75ea7968b075333434404485c33114','george_sofian96@yahoo.com',0000000000,NULL,NULL),(8,'george','b211467c01d79bedbb78772880795770a9e867e58d673a8ab330fc88c2670d513114','george@sofian.ro',0000000000,1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-10 18:23:22
