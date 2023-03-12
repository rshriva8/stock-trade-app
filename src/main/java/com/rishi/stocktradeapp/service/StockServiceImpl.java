package com.rishi.stocktradeapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rishi.stocktradeapp.dao.StockDAO;
import com.rishi.stocktradeapp.entity.Stock;

@Service
public class StockServiceImpl implements StockService {
	private StockDAO stockDAO;
	
	@Autowired
	public StockServiceImpl(@Qualifier("stockDAOJpaImpl") StockDAO theStockDAO) {
		stockDAO=theStockDAO;
	}

	@Override
	@Transactional
	public List<Stock> findAll() {
		// TODO Auto-generated method stub
		return stockDAO.findAll();
	}

	@Override
	@Transactional
	public Stock findById(int theId) {
		// TODO Auto-generated method stub
		return stockDAO.findById(theId);
	}

	@Override
	@Transactional
	public void save(Stock theStock) {
		// TODO Auto-generated method stub
		stockDAO.save(theStock);
	}

	@Override
	@Transactional
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		stockDAO.deleteById(theId);
	}

}
