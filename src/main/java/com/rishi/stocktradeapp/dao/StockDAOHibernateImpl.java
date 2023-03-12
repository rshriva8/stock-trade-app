package com.rishi.stocktradeapp.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rishi.stocktradeapp.entity.Stock;

@Repository
public class StockDAOHibernateImpl implements StockDAO {
	
	private EntityManager entityManager;
	
	@Autowired
	public StockDAOHibernateImpl(EntityManager theEntityManager) {
		entityManager=theEntityManager;
	}
	
	@Override
	public List<Stock> findAll() {
		// TODO Auto-generated method stub
		Session currentSession=entityManager.unwrap(Session.class);
		
		Query<Stock> theQuery=currentSession.createQuery("from stock", Stock.class);
		
		List<Stock> stocks=theQuery.getResultList();
		
		return stocks;
	}

	@Override
	public Stock findById(int theId) {
		// TODO Auto-generated method stub
		Session currentSession=entityManager.unwrap(Session.class);
		
		Stock theStock=currentSession.get(Stock.class, theId);

		return theStock;
	}

	@Override
	public void save(Stock theStock) {
		// TODO Auto-generated method stub
		Session currentSession=entityManager.unwrap(Session.class);
		
		currentSession.saveOrUpdate(theStock);
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		Session currentSession=entityManager.unwrap(Session.class);
		
		Query theQuery=currentSession.createQuery("delete from stock where id=:stockId");
		theQuery.setParameter("stockId", theId);
		theQuery.executeUpdate();
	}

}
