package com.rishi.stocktradeapp.service;

import java.util.List;

import com.rishi.stocktradeapp.entity.Stock;

public interface StockService {
	public List<Stock> findAll();
	
	public Stock findById(int theId);
	
	public void save(Stock theStock);
	
	public void deleteById(int theId);
}
