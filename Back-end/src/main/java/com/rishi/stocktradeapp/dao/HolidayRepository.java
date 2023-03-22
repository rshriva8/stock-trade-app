package com.rishi.stocktradeapp.dao;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {
	Optional<Holiday> findByDate(Date date);
}
