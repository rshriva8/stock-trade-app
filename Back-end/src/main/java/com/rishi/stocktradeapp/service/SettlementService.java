package com.rishi.stocktradeapp.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.rishi.stocktradeapp.dao.LimitOrderRepository;
import com.rishi.stocktradeapp.dao.OrderRepository;
import com.rishi.stocktradeapp.dao.StockRepository;
import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.LimitOrder;
import com.rishi.stocktradeapp.entity.Stock;
import com.rishi.stocktradeapp.entity.Transaction;
import com.rishi.stocktradeapp.entity.User;

@Service
public class SettlementService {
    @Autowired
    private LimitOrderRepository limitOrderRepository;

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    
    Logger logger=LoggerFactory.getLogger(SettlementService.class);
    
    @Scheduled(fixedDelay = 5000)
    public void executeLimitOrders() {
    	logger.info("Checking Limit Orders");
        List<LimitOrder> limitOrders = limitOrderRepository.findAll();

        for (LimitOrder limitOrder : limitOrders) {
            if (limitOrder.getExpiryDate().isBefore(LocalDate.now())) {
            	logger.info("******************DELETING LIMIT ORDER");
                limitOrderRepository.delete(limitOrder);
                continue;
            }

            double stockValue = stockRepository.getStockValueByStockId((limitOrder.getStock()).getId());

            if (limitOrder.getOrderType().equals("BUY") && stockValue <= limitOrder.getDesiredPrice()) {
                executeBuyTransaction(limitOrder, stockValue);
            } else if (limitOrder.getOrderType().equals("SELL") && stockValue >= limitOrder.getDesiredPrice()) {
                executeSellTransaction(limitOrder, stockValue);
            }
        }
    }

    private void executeBuyTransaction(LimitOrder limitOrder, double stockValue) {
    	logger.info("******************BUYING LIMIT ORDER");
        double totalPrice = limitOrder.getOrderVolume() * limitOrder.getDesiredPrice();
        Stock stock=limitOrder.getStock();
        stock.setStockVolume(stock.getStockVolume()-limitOrder.getOrderVolume());
        User user=limitOrder.getUser();
        user.setBalance(user.getBalance()-totalPrice);
        Transaction transaction = new Transaction();
        transaction.setOpenPrice(limitOrder.getDesiredPrice());
        transaction.setUser(user);
        transaction.setStock(stock);
        transaction.setOrderTimestamp(LocalDateTime.now());
        transaction.setTotalPrice(totalPrice);
        transaction.setOrderType("BUY");
        transaction.setOrderVolume(limitOrder.getOrderVolume());
        orderRepository.save(transaction);
        userRepository.save(user);
        stockRepository.save(stock);
        limitOrderRepository.delete(limitOrder);
        
    }

    private void executeSellTransaction(LimitOrder limitOrder, double stockPrice) {
    	logger.info("*****************SELLING LIMIT ORDER");
        double totalPrice = limitOrder.getOrderVolume() * limitOrder.getDesiredPrice();
        Stock stock=limitOrder.getStock();
        stock.setStockVolume(stock.getStockVolume()+limitOrder.getOrderVolume());
        User user=limitOrder.getUser();
        user.setBalance(user.getBalance()+totalPrice);
        Transaction transaction = new Transaction();
        transaction.setOpenPrice(limitOrder.getDesiredPrice());
        transaction.setUser(user);
        transaction.setStock(stock);
        transaction.setOrderTimestamp(LocalDateTime.now());
        transaction.setTotalPrice(totalPrice);
        transaction.setOrderType("SELL");
        transaction.setOrderVolume(limitOrder.getOrderVolume());
        orderRepository.save(transaction);
        userRepository.save(user);
        stockRepository.save(stock);
        limitOrderRepository.delete(limitOrder);
    }
}