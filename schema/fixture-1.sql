-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: limble
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.36-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'location 1'),(2,'location 2'),(3,'location 3'),(4,'location 4'),(5,'location 5'),(6,'location 6'),(7,'location 7');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `logged_time`
--

LOCK TABLES `logged_time` WRITE;
/*!40000 ALTER TABLE `logged_time` DISABLE KEYS */;
INSERT INTO `logged_time` VALUES (1,1200,1,1),(2,3600,2,2),(3,4000,3,3),(4,600,4,4),(5,1800,5,5),(6,300,6,6),(7,10000,7,7),(8,1200,8,8),(9,600,9,9),(10,4000,10,10),(11,10000,11,1),(12,3600,12,2),(13,3500,13,3),(14,1200,14,4),(15,5689,15,5),(16,1200,16,6),(17,3600,17,7),(18,5671,18,8),(19,3600,19,9),(20,4000,20,10),(21,300,1,1),(22,1200,2,2),(23,600,3,3),(24,1200,4,4),(25,300,5,5),(26,3600,6,6),(27,4000,7,7),(28,600,8,8),(29,600,9,9),(30,1200,10,10),(31,300,11,1),(32,300,12,2),(33,4000,13,3),(34,300,14,4),(35,3600,15,5),(36,300,16,6),(37,1200,17,7),(38,300,18,8),(39,4000,19,9),(40,300,20,10);
/*!40000 ALTER TABLE `logged_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'task 1',1,1),(2,'task 2',2,1),(3,'task 3',3,1),(4,'task 4',4,0),(5,'task 5',5,0),(6,'task 6',6,1),(7,'task 7',7,1),(8,'task 8',1,1),(9,'task 9',2,1),(10,'task 10',3,1),(11,'task 11',4,1),(12,'task 12',5,0),(13,'task 13',7,0),(14,'task 14',7,0),(15,'task 15',1,0),(16,'task 16',2,1),(17,'task 17',3,0),(18,'task 18',4,1),(19,'task 19',5,1),(20,'task 20',6,0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `workers`
--

LOCK TABLES `workers` WRITE;
/*!40000 ALTER TABLE `workers` DISABLE KEYS */;
INSERT INTO `workers` VALUES (1,'worker 1',10.00),(2,'worker 2',20.00),(3,'worker 3',15.00),(4,'worker 4',14.00),(5,'worker 5',17.00),(6,'worker 6',14.00),(7,'worker 7',10.00),(8,'worker 8',20.00),(9,'worker 9',25.00),(10,'worker 10',18.00);
/*!40000 ALTER TABLE `workers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-18 12:30:55
