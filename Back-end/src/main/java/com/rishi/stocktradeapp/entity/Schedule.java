package com.rishi.stocktradeapp.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="schedule")
@Table(name="schedule")
public class Schedule {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="market_schedule_id")
    private int marketScheduleId;
	
    @Column(name = "market_start_time")
    private LocalTime marketStartTime;

    @Column(name = "market_end_time")
    private LocalTime marketEndTime;
    
    public Schedule() {}

	public Schedule(LocalTime marketStartTime, LocalTime marketEndTime) {
		this.marketStartTime = marketStartTime;
		this.marketEndTime = marketEndTime;
	}

	public int getMarketScheduleId() {
		return marketScheduleId;
	}

	public void setMarketScheduleId(int marketScheduleId) {
		this.marketScheduleId = marketScheduleId;
	}

	public LocalTime getMarketStartTime() {
		return marketStartTime;
	}

	public void setMarketStartTime(LocalTime marketStartTime) {
		this.marketStartTime = marketStartTime;
	}

	public LocalTime getMarketEndTime() {
		return marketEndTime;
	}

	public void setMarketEndTime(LocalTime marketEndTime) {
		this.marketEndTime = marketEndTime;
	}

	@Override
	public String toString() {
		return "MarketSchedule [marketScheduleId=" + marketScheduleId + ", marketStartTime=" + marketStartTime
				+ ", marketEndTime=" + marketEndTime + "]";
	}
	
}
