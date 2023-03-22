CREATE DEFINER=`root`@`localhost` TRIGGER `stock_AFTER_UPDATE` AFTER UPDATE ON `stock` FOR EACH ROW BEGIN
SET @current_date = CURDATE();

    -- Check if the stock ID already exists in the daily price table for the current date
    SET @exists = (SELECT COUNT(*) FROM stock_daily_data WHERE stock_id = NEW.stock_id AND date = @current_date);
    
    -- If the stock ID does not exist, insert a new row with the low and high prices set to the current stock price
    IF (@exists = 0) THEN
        INSERT INTO stock_daily_data (stock_id, date, low_price, high_price) VALUES (NEW.stock_id, @current_date, NEW.stock_value, NEW.stock_value);
    -- If the stock ID already exists, update the low and high prices if necessary
    ELSE
        UPDATE stock_daily_data
        SET low_price = IFNULL(LEAST(low_price, NEW.stock_value), NEW.stock_value),
            high_price = IFNULL(GREATEST(high_price, NEW.stock_value), NEW.stock_value)
        WHERE stock_id = NEW.stock_id AND date = @current_date;
    END IF;
END