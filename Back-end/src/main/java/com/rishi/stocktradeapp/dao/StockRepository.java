package com.rishi.stocktradeapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rishi.stocktradeapp.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {
	
	Stock findById(int id);
	
	@Query("SELECT s.stockValue FROM stock s WHERE s.stockId = :stockId")
    Double getStockValueByStockId(@Param("stockId") int id);
}
