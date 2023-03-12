package com.rishi.stocktradeapp.service;

import java.util.List;

import com.rishi.stocktradeapp.entity.User;

public interface UserService {
	public List<User> findAll();
	
	public User findById(int theId);
	
	public void save(User theUser);
	
	public void deleteById(int theId);
}
