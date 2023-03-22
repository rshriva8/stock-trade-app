CREATE DATABASE IF NOT EXISTS stock_trade_app;
USE stock_trade_app;
CREATE TABLE `auth_user_authority` (
  `user_id` int DEFAULT NULL,
  `authorities_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `authority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ROLE_CODE` varchar(45) DEFAULT NULL,
  `ROLE_DESCRIPTION` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `holiday` (
  `holiday_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`holiday_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `limit_order` (
  `limit_order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `stock_id` int NOT NULL,
  `order_type` varchar(10) NOT NULL,
  `order_volume` int NOT NULL,
  `desired_price` double NOT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `money_held` double DEFAULT NULL,
  PRIMARY KEY (`limit_order_id`),
  KEY `limit_to_user_idx` (`user_id`),
  KEY `limit_to_stock_idx` (`stock_id`),
  CONSTRAINT `limit_to_stock` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`),
  CONSTRAINT `limit_to_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `market_schedule` (
  `market_schedule_id` int NOT NULL AUTO_INCREMENT,
  `day_of_week` int DEFAULT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL,
  `is_open` tinyint DEFAULT '0',
  PRIMARY KEY (`market_schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `stock` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `stock_name` varchar(45) DEFAULT NULL,
  `stock_value` double DEFAULT NULL,
  `stock_ticker` varchar(10) DEFAULT NULL,
  `stock_volume` int DEFAULT NULL,
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ownership` (
  `ownership_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `stocks_id` int NOT NULL,
  `user_stocks_volume` int DEFAULT NULL,
  PRIMARY KEY (`ownership_id`),
  KEY `stock_id_idx` (`stocks_id`),
  KEY `owner_to_user_idx` (`user_id`),
  KEY `owner_to_stock_idx` (`stocks_id`),
  CONSTRAINT `owner_to_stock` FOREIGN KEY (`stocks_id`) REFERENCES `stock` (`stock_id`) ON UPDATE CASCADE,
  CONSTRAINT `owner_to_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `stock_daily_data` (
  `stock_daily_data_id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `date` date NOT NULL,
  `low_price` decimal(10,2) DEFAULT NULL,
  `high_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`stock_daily_data_id`),
  KEY `daily_to_stock_idx` (`stock_id`),
  CONSTRAINT `daily_to_stock` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transaction` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_type` varchar(15) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `order_volume` int DEFAULT NULL,
  `order_open_price` double DEFAULT NULL,
  `order_total_price` double DEFAULT NULL,
  `order_timestamp` datetime DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_idx` (`user_id`),
  KEY `stock_idx` (`stock_id`),
  CONSTRAINT `stock_id` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(45) DEFAULT NULL,
  `USER_KEY` varchar(200) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `CREATED_ON` datetime DEFAULT NULL,
  `UPDATED_ON` datetime DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `enabled` tinyint DEFAULT NULL,
  `balance` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `USER_NAME_UNIQUE` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
