package com.rishi.stocktradeapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rishi.stocktradeapp.dao.UserDAO;
import com.rishi.stocktradeapp.entity.User;

@Service
public class UserServiceImpl implements UserService {
	private UserDAO userDAO;
	
	@Autowired
	public UserServiceImpl(@Qualifier("userDAOJpaImpl")UserDAO theUserDAO) {
		userDAO = theUserDAO;
	}

	@Override
	@Transactional
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public User findById(int theId) {
		// TODO Auto-generated method stub
		return userDAO.findById(theId);
	}

	@Override
	@Transactional
	public void save(User theUser) {
		// TODO Auto-generated method stub
		userDAO.save(theUser);
	}

	@Override
	@Transactional
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		userDAO.deleteById(theId);
	}

}
