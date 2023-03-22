package com.rishi.stocktradeapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name="ownership")
@Table(name="ownership")
public class Ownership {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ownership_id")
    private int ownershipId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stocks_id")
    private Stock stocks;
    
    @Column(name="user_stocks_volume")
    private int userStocksVolume;
    
    public Ownership() {}

	public Ownership(User user, Stock stocks, int userStocksVolume) {
		this.user = user;
		this.stocks = stocks;
		this.userStocksVolume = userStocksVolume;
	}

	public int getUser_stocks_id() {
		return ownershipId;
	}

	public void setUser_stocks_id(int ownershipId) {
		this.ownershipId = ownershipId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Stock getStocks() {
		return stocks;
	}

	public void setStocks(Stock stocks) {
		this.stocks = stocks;
	}

	public int getUserStocksVolume() {
		return userStocksVolume;
	}

	public void setUserStocksVolume1(int userStocksVolume) {
		this.userStocksVolume = userStocksVolume;
	}

	@Override
	public String toString() {
		return "UserStocks [userStocksId=" + ownershipId + ", user=" + user + ", stocks=" + stocks
				+ ", userStocksVolume=" + userStocksVolume + "]";
	}
	
}
