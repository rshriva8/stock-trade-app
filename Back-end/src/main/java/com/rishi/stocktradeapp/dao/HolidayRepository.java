package com.rishi.stocktradeapp.dao;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rishi.stocktradeapp.entity.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {
	Optional<Holiday> findByDate(Date date);
	
	@Query("SELECT COUNT(h) > 0 FROM holiday h WHERE h.date = :date")
	boolean existsByDate(@Param("date") LocalDate date);
}
