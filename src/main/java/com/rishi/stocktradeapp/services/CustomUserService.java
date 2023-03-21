package com.rishi.stocktradeapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.User;
@Service
public class CustomUserService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
User user=userRepository.findByUserName(userName);
		
		if(null==user) {
			throw new UsernameNotFoundException("User Not Found with userName "+userName);
		}
		return user;
	}

}