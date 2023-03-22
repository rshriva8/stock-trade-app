package com.rishi.stocktradeapp.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name="limit_order")
@Table(name="limit_order")
public class LimitOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="limit_order_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @Column(name = "order_type", nullable = false)
    private String orderType;
    
    @Column(name = "order_volume", nullable = false)
    private int orderVolume;

    @Column(name = "desired_price", nullable = false)
    private double desiredPrice;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;
    @Column(name = "status", nullable = false)
    private String status;
    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated;
    @Column(name = "last_updated", nullable = false)
    private LocalDate lastUpdated;
    

    // Constructors, getters, and setters
    public LimitOrder() {}
    
    

	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Stock getStock() {
		return stock;
	}


	public void setStock(Stock stock) {
		this.stock = stock;
	}


	public String getOrderType() {
		return orderType;
	}


	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}


	public int getOrderVolume() {
		return orderVolume;
	}


	public void setOrderVolume(int orderVolume) {
		this.orderVolume = orderVolume;
	}


	public double getDesiredPrice() {
		return desiredPrice;
	}


	public void setDesiredPrice(double desiredPrice) {
		this.desiredPrice = desiredPrice;
	}


	public LocalDate getExpiryDate() {
		return expiryDate;
	}


	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public LocalDate getDateCreated() {
		return dateCreated;
	}


	public void setDateCreated(LocalDate localDate) {
		this.dateCreated = localDate;
	}


	public LocalDate getLastUpdated() {
		return lastUpdated;
	}


	public void setLastUpdated(LocalDate localDate) {
		this.lastUpdated = localDate;
	}


	public LimitOrder(User user, Stock stock, String orderType, int orderVolume, double desiredPrice,
			LocalDate expiryDate, String status, LocalDate dateCreated, LocalDate lastUpdated) {
		this.user = user;
		this.stock = stock;
		this.orderType = orderType;
		this.orderVolume = orderVolume;
		this.desiredPrice = desiredPrice;
		this.expiryDate = expiryDate;
		this.status = status;
		this.dateCreated = dateCreated;
		this.lastUpdated = lastUpdated;
	}
    
}