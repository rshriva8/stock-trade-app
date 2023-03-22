package com.rishi.stocktradeapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.LimitOrder;

public interface LimitOrderRepository extends JpaRepository<LimitOrder, Integer> {

	
	Optional<LimitOrder> findById(int id);
	List<LimitOrder> findByUserId(int userId);
	
}
