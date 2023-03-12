package com.rishi.stocktradeapp.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rishi.stocktradeapp.entity.User;

@Repository
public class UserDAOJpaImpl implements UserDAO {
	
	private EntityManager entityManager;
	@Autowired
	public UserDAOJpaImpl(EntityManager theEntityManager){
		entityManager=theEntityManager;
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		Query theQuery=entityManager.createQuery("from user");
		List<User> users=theQuery.getResultList();
		return users;
	}

	@Override
	public User findById(int theId) {
		// TODO Auto-generated method stub
		User theUser=entityManager.find(User.class,theId);
		return theUser;
	}

	@Override
	public void save(User theUser) {
		// TODO Auto-generated method stub
		User user=entityManager.merge(theUser);
		theUser.setId(user.getId());
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		Query theQuery = entityManager.createQuery("delete from user where id=:userId");
		theQuery.setParameter("userId", theId);
		theQuery.executeUpdate();
	}

}
