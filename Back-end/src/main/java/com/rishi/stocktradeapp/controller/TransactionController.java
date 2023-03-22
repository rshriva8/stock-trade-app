package com.rishi.stocktradeapp.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.dao.LimitOrderRepository;
import com.rishi.stocktradeapp.dao.OrderRepository;
import com.rishi.stocktradeapp.dao.StockRepository;
import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.LimitOrder;
import com.rishi.stocktradeapp.entity.User;

@RestController
@RequestMapping("/api/orders")
public class TransactionController {

	 @Autowired
	  private OrderRepository orderRepository;
	 @Autowired
	  private LimitOrderRepository limitOrderRepository;
	 
	 @Autowired
		private UserDetailsService userDetailsService;
	 
	 @Autowired
		StockRepository stockRepository;
	 
	 @Autowired
		private UserRepository userRepository;
	 
	 @GetMapping("/limit-buy")
	    public ResponseEntity<String> placeBuyLimitOrder(Principal user, @RequestParam("volume") int volume, @RequestParam("stockId") int stockId,
				@RequestParam("desiredValue") String val, @RequestParam("expiryDate") String expiryDate) {
		 
		 User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
			double value=Double.parseDouble(val);
			LocalDate expiry=LocalDate.parse(expiryDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			LimitOrder order=new LimitOrder();
			order.setStock(stockRepository.findById(stockId));
			order.setUser(userObj);
			order.setDesiredPrice(value);
			order.setDateCreated(LocalDate.now());
			order.setLastUpdated(LocalDate.now());
			order.setExpiryDate(expiry);
			order.setOrderType("BUY");
			order.setOrderVolume(volume);
			order.setStatus("OPEN");
			limitOrderRepository.save(order);
			return ResponseEntity.ok("Order Placed");
	    }
	 @GetMapping("/limit-sell")
	 public ResponseEntity<String> placeSellLimitOrder(Principal user, @RequestParam("volume") int volume, @RequestParam("stockId") int stockId,
			 @RequestParam("desiredValue") String val, @RequestParam("expiryDate") String expiryDate) {
		 
		 User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		 double value=Double.parseDouble(val);
		 LocalDate expiry=LocalDate.parse(expiryDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		 LimitOrder order=new LimitOrder();
		 order.setStock(stockRepository.findById(stockId));
		 order.setUser(userObj);
		 order.setDesiredPrice(value);
		 order.setDateCreated(LocalDate.now());
		 order.setLastUpdated(LocalDate.now());
		 order.setExpiryDate(expiry);
		 order.setOrderType("SELL");
		 order.setOrderVolume(volume);
		 order.setStatus("OPEN");
		 limitOrderRepository.save(order);
		 return ResponseEntity.ok("Order Placed");
	 }
	 
	    @GetMapping("/delete/{orderId}")
	    public ResponseEntity<String> cancelOrder(@PathVariable int orderId) {
	        Optional<LimitOrder> optionalOrder = limitOrderRepository.findById(orderId);
	        if (optionalOrder.isPresent()) {
	        	LimitOrder order = optionalOrder.get();
	            limitOrderRepository.delete(order);	            
	            return ResponseEntity.ok("Order cancelled successfully.");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    
	    @GetMapping("/auth/mylimitorders")
		public List<LimitOrder> getRowsByUserId(Principal user) {
			User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
			int userId=userObj.getId();
		    return limitOrderRepository.findByUserId(userId);
		}
	    
	    
	 
}
