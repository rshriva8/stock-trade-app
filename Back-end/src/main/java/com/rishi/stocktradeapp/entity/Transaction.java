package com.rishi.stocktradeapp.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity(name="transaction")
@Table(name="transaction")
public class Transaction {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="order_id")
	private int orderId;
	
	@Column(name="order_type")
	private String orderType;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
    @JoinColumn(name = "stock_id")
	private Stock stock;
	
	@Column(name="order_volume")
	private int orderVolume;
	
	@Column(name="order_open_price")
	private double orderOpenPrice;
	
	@Column(name="order_total_price")
	private double orderTotalPrice;
	
	@Column(name="order_timestamp")
	private LocalDateTime orderTimestamp;
	
	public Transaction() {}
	
	public Transaction(String orderType, User user, Stock stock, int orderVolume, double orderOpenPrice, double orderTotalPrice,
			LocalDateTime orderTimestamp) {
		this.orderType = orderType;
		this.user = user;
		this.stock = stock;
		this.orderVolume = orderVolume;
		this.orderOpenPrice = orderOpenPrice;
		this.orderTotalPrice = orderTotalPrice;
		this.orderTimestamp = orderTimestamp;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
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

	public int getOrderVolume() {
		return orderVolume;
	}

	public void setOrderVolume(int orderVolume) {
		this.orderVolume = orderVolume;
	}

	public double getOpenPrice() {
		return orderOpenPrice;
	}

	public void setOpenPrice(double openPrice) {
		this.orderOpenPrice = openPrice;
	}

	public double getTotalPrice() {
		return orderTotalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.orderTotalPrice = totalPrice;
	}

	public LocalDateTime getOrderTimestamp() {
		return orderTimestamp;
	}

	public void setOrderTimestamp(LocalDateTime orderTimestamp) {
		this.orderTimestamp = orderTimestamp;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", orderType=" + orderType + ", user=" + user + ", stock=" + stock
				+ ", orderVolume=" + orderVolume + ", orderOpenPrice=" + orderOpenPrice + ", orderTotalPrice="
				+ orderTotalPrice + ", orderTimestamp=" + orderTimestamp + "]";
	}
	
}
