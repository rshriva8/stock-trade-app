package com.rishi.stocktradeapp.responses;

public class StockInfo {
    private int id;
    private String name;
    private double price;
    private double dailyLow;
    private double dailyHigh;
    public int volume;
    private String ticker;
    
    
    
	public String getTicker() {
		return ticker;
	}
	public void setTicker(String ticker) {
		this.ticker = ticker;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getDailyLow() {
		return dailyLow;
	}
	public void setDailyLow(double dailyLow) {
		this.dailyLow = dailyLow;
	}
	public double getDailyHigh() {
		return dailyHigh;
	}
	public void setDailyHigh(double dailyHigh) {
		this.dailyHigh = dailyHigh;
	}
	
	public int getVolume() {
		return volume;
	}
	public void setVolume(int volume) {
		this.volume = volume;
	}
	public StockInfo(int stockId, String name, String ticker, double price, double dailyLow, double dailyHigh, int volume) {
		this.id=stockId;
		this.name = name;
		this.ticker=ticker;
		this.price = price;
		this.dailyLow = dailyLow;
		this.dailyHigh = dailyHigh;
		this.volume=volume;
	}
	@Override
	public String toString() {
		return "StockInfo [id=" + id + ", name=" + name + ", price=" + price + ", dailyLow="
				+ dailyLow + ", dailyHigh=" + dailyHigh + "]";
	}
    
    // constructor, getters, and setters omitted for brevity
}