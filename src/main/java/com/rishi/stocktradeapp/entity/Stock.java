package com.rishi.stocktradeapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="stock")
@Table(name="stock")
public class Stock {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="stock_id")
	private int stockId;
	@Column(name="stock_name")
	private String stockName;
	@Column(name="stock_value")
	private double stockValue;
	@Column(name="tick_size")
	private double tickSize;
	public int getId() {
		return stockId;
	}
	public void setId(int id) {
		this.stockId = id;
	}
	public String getStock_name() {
		return stockName;
	}
	public void setStock_name(String stock_name) {
		this.stockName = stock_name;
	}
	public double getStock_value() {
		return stockValue;
	}
	public void setStock_value(double stock_value) {
		this.stockValue = stock_value;
	}
	
	public double getTickSize() {
		return tickSize;
	}
	public void setTickSize(double tickSize) {
		this.tickSize = tickSize;
	}
	public Stock() {}

	public Stock(String stockName, double stockValue, double tickSize) {
		this.stockName = stockName;
		this.stockValue = stockValue;
		this.tickSize = tickSize;
	}
	@Override
	public String toString() {
		return "Stock [stockId=" + stockId + ", stockName=" + stockName + ", stockValue=" + stockValue + ", tickSize="
				+ tickSize + "]";
	}
}
