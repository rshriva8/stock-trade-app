package com.rishi.stocktradeapp.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;


@Entity(name="market_schedule")
@Table(name="market_schedule")
public class MarketSchedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="market_schedule_id")
    private int id;
    
    @Column(name="day_of_week")
    private int openDaysOfWeek;
    
    @Type(type = "java.time.LocalTime")
    @Column(name="opening_time")
    private LocalTime openingTime;
    
    @Type(type = "java.time.LocalTime")
    @Column(name="closing_time")
    private LocalTime closingTime;

    public MarketSchedule() {}

    public MarketSchedule(int openDaysOfWeek, LocalTime openingTime, LocalTime closingTime) {
        this.openDaysOfWeek = openDaysOfWeek;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOpenDaysOfWeek() {
        return openDaysOfWeek;
    }

    public void setOpenDaysOfWeek(int openDaysOfWeek) {
        this.openDaysOfWeek = openDaysOfWeek;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }
}
