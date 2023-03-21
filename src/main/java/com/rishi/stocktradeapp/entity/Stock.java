package com.rishi.stocktradeapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity(name="stock")
@Table(name="stock")
public class Stock {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="stock_id")
	@NotNull
	private int stockId;
	@Column(name="stock_name")
	private String stockName;
	@Column(name="stock_value")
	private double stockValue;
	@Column(name="stock_ticker")
	private double stockTicker;
	@Column(name="stock_volume")
	private int stockVolume;

	
	public int getId() {
		return stockId;
	}
	public void setId(int id) {
		this.stockId = id;
	}
	
	
	
	public String getStockName() {
		return stockName;
	}
	public void setStockName(String stockName) {
		this.stockName = stockName;
	}
	
	public double getStockValue() {
		return stockValue;
	}
	public void setStockValue(double stockValue) {
		this.stockValue = stockValue;
	}
	public double getStockTicker() {
		return stockTicker;
	}
	public void setStockTicker(double stockTicker) {
		this.stockTicker = stockTicker;
	}
	public int getStockVolume() {
		return stockVolume;
	}
	public void setStockVolume(int stockVolume) {
		this.stockVolume = stockVolume;
	}
	public Stock() {
		
	}

	
	


	public Stock(String stockName, double stockValue, double stockTicker, int stockVolume) {
		this.stockName = stockName;
		this.stockValue = stockValue;
		this.stockTicker = stockTicker;
		this.stockVolume= stockVolume;
	}
	@Override
	public String toString() {
		return "Stock [stockId=" + stockId + ", stockName=" + stockName + ", stockValue=" + stockValue
				+ ", stockTicker=" + stockTicker + ", stockVolume=" + stockVolume + "]";
	}
	
	
}
