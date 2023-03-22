CREATE DEFINER=`root`@`localhost` TRIGGER `order_AFTER_INSERT` AFTER INSERT ON `transaction` FOR EACH ROW BEGIN
IF NEW.order_type = 'BUY' THEN
        SELECT COUNT(*) INTO @pair_exists FROM ownership WHERE user_id = NEW.user_id AND stocks_id = NEW.stock_id;
        IF @pair_exists > 0 THEN
            UPDATE ownership SET user_stocks_volume = user_stocks_volume + NEW.order_volume WHERE user_id = NEW.user_id AND stocks_id = NEW.stock_id;
        ELSE
            -- create new stock pair
            INSERT INTO ownership (user_id, stocks_id, user_stocks_volume) VALUES (NEW.user_id, NEW.stock_id, NEW.order_volume);
        END IF;
    ELSEIF NEW.order_type = 'SELL' THEN
        -- check if user owns the stock pair
        SELECT COUNT(*) INTO @pair_exists FROM ownership WHERE user_id = NEW.user_id AND stocks_id = NEW.stock_id;
        IF @pair_exists > 0 THEN
            -- subtract volume from existing stock pair
            UPDATE ownership SET user_stocks_volume = user_stocks_volume - NEW.order_volume WHERE user_id = NEW.user_id AND stocks_id = NEW.stock_id;
            -- delete the pair if volume becomes 0
            DELETE FROM ownership WHERE user_id = NEW.user_id AND stocks_id = NEW.stock_id AND user_stocks_volume = 0;
        END IF;
    END IF;
END