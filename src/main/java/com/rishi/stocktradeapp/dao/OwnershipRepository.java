package com.rishi.stocktradeapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.Ownership;

public interface OwnershipRepository extends JpaRepository<Ownership, Integer> {
	List<Ownership> findByUserId(int userId);
}
