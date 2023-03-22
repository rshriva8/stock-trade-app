CREATE DEFINER=`root`@`localhost` TRIGGER `stock_AFTER_INSERT` AFTER INSERT ON `stock` FOR EACH ROW BEGIN
SET @current_date = CURDATE();
INSERT INTO stock_daily_data (stock_id, date, low_price, high_price) VALUES (NEW.stock_id, @current_date, NEW.stock_value, NEW.stock_value);
END