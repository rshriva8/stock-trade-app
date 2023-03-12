package com.rishi.stocktradeapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.User;

@Service
public class UserServiceImpl implements UserService {
	private UserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(UserRepository theUserRepository) {
		userRepository = theUserRepository;
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User findById(int theId) {
		// TODO Auto-generated method stub
		Optional<User> result = userRepository.findById(theId);
		User user=null;
		if(result.isPresent())
			user= result.get();
		return user;
	}

	@Override
	public void save(User theUser) {
		// TODO Auto-generated method stub
		userRepository.save(theUser);
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		userRepository.deleteById(theId);
	}

}
