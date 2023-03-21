package com.rishi.stocktradeapp.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity(name="stock_daily_data")
@Table(name="stock_daily_data")
public class StockDaily {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="stock_daily_data_id")
	@NotNull
	private int stockDailyId;
	
	@ManyToOne
	@JoinColumn(name="stock_id")
	@NotNull
	private Stock stock;
	
	@Column(name="date")
	@NotNull
	private Date date;
	
	@Column(name="low_price")
	private double lowPrice;

	@Column(name="high_price")
	private double highPrice;
	
	

	public int getStockId() {
		return stockDailyId;
	}

	public void setStockId(int stockDailyId) {
		this.stockDailyId = stockDailyId;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getLowPrice() {
		return lowPrice;
	}

	public void setLowPrice(double lowPrice) {
		this.lowPrice = lowPrice;
	}

	public double getHighPrice() {
		return highPrice;
	}

	public void setHighPrice(int highPrice) {
		this.highPrice = highPrice;
	}
	
	public StockDaily() {}

	public StockDaily(@NotNull Stock stock, @NotNull Date date, double lowPrice, int highPrice) {
		this.stock = stock;
		this.date = date;
		this.lowPrice = lowPrice;
		this.highPrice = highPrice;
	}
	
	
}
