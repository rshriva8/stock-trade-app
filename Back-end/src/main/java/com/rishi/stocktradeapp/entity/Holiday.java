package com.rishi.stocktradeapp.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity(name="holiday")
@Table(name="holiday")
public class Holiday {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="holiday_id")
	@NotNull
	private int holidayId;
	
	@Column(name="date")
	private Date date;

	public int getHolidayId() {
		return holidayId;
	}

	public void setHolidayId(int holidayId) {
		this.holidayId = holidayId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Holiday(Date date) {
		this.date = date;
	}

	public Holiday() {
	}
	
	
}
