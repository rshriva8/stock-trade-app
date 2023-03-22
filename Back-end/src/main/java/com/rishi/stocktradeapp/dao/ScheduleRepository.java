package com.rishi.stocktradeapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishi.stocktradeapp.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

}
