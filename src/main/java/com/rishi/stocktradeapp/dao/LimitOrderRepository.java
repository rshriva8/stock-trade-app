package com.rishi.stocktradeapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.LimitOrder;

public interface LimitOrderRepository extends JpaRepository<LimitOrder, Integer> {

}
