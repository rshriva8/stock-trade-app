package com.rishi.stocktradeapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.Transaction;

public interface OrderRepository extends JpaRepository<Transaction, Integer> {
	List<Transaction> findByUserId(int userId);
}
