package com.rishi.stocktradeapp.dao;

import java.util.List;

import com.rishi.stocktradeapp.entity.Stock;

public interface StockDAO {
	public List<Stock> findAll();
	
	public Stock findById(int theId);
	
	public void save(Stock theStock);
	
	public void deleteById(int theId);
}
