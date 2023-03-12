package com.rishi.stocktradeapp.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rishi.stocktradeapp.entity.Stock;

@Repository
public class StockDAOJpaImpl implements StockDAO {
	
	private EntityManager entityManager;
	@Autowired
	public StockDAOJpaImpl(EntityManager theEntityManager){
		entityManager=theEntityManager;
	}
	@Override
	public List<Stock> findAll() {
		Query theQuery=entityManager.createQuery("from stock");
		List<Stock> stocks=theQuery.getResultList();
		return stocks;
	}

	@Override
	public Stock findById(int theId) {
		// TODO Auto-generated method stub
		Stock theStock=entityManager.find(Stock.class,theId);
		return theStock;
	}

	@Override
	public void save(Stock theStock) {
		// TODO Auto-generated method stub
		Stock stock=entityManager.merge(theStock);
		theStock.setId(stock.getId());
		
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		Query theQuery = entityManager.createQuery("delete from stock where id=:stockId");
		theQuery.setParameter("stockId", theId);
		theQuery.executeUpdate();
	}

}
