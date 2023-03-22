package com.rishi.stocktradeapp.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rishi.stocktradeapp.entity.StockDaily;

public interface StockDailyRepository extends JpaRepository<StockDaily, Integer> {
	
	StockDaily findById(int stockDailyId);
	List<StockDaily> findByStockAndDate(int stock, Date date);
	
	@Query("SELECT MIN(sd.lowPrice) FROM stock_daily_data sd WHERE sd.stock.stockId = :stockId AND sd.date = CURRENT_DATE()")
	double findDailyLowByStockIdAndTodayDate(@Param("stockId") int stockId);


	@Query("SELECT MAX(sd.highPrice) FROM stock_daily_data sd WHERE sd.stock.stockId = :stockId AND sd.date = CURRENT_DATE()")
	double findDailyHighByStockIdAndTodayDate(@Param("stockId") int stockId);

}
