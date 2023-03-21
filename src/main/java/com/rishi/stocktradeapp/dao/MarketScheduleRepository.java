package com.rishi.stocktradeapp.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.MarketSchedule;

public interface MarketScheduleRepository extends JpaRepository<MarketSchedule, Integer> {

	Optional<MarketSchedule> findByOpenDaysOfWeek(int openDaysOfWeek);

}
