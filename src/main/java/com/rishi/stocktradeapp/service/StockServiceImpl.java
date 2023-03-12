package com.rishi.stocktradeapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rishi.stocktradeapp.dao.StockRepository;
import com.rishi.stocktradeapp.entity.Stock;

@Service
public class StockServiceImpl implements StockService {
	private StockRepository stockRepository;
	
	@Autowired
	public StockServiceImpl( StockRepository theStockRepository) {
		stockRepository=theStockRepository;
	}

	@Override
	@Transactional
	public List<Stock> findAll() {
		// TODO Auto-generated method stub
		return stockRepository.findAll();
	}

	@Override
	@Transactional
	public Stock findById(int theId) {
		// TODO Auto-generated method stub
		Optional<Stock> result = stockRepository.findById(theId);
		Stock stock=null;
		if(result.isPresent())
			stock= result.get();
		return stock;
	}

	@Override
	@Transactional
	public void save(Stock theStock) {
		// TODO Auto-generated method stub
		stockRepository.save(theStock);
	}

	@Override
	@Transactional
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		stockRepository.deleteById(theId);
	}

}
