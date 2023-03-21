package com.rishi.stocktradeapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {
	
	Stock findById(int id);
}
