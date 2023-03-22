package com.rishi.stocktradeapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserName(String userName);

}
