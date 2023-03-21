package com.rishi.stocktradeapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.User;

@RestController
public class BalanceController {
	
	 private double balance = 0.0;
	
	@Autowired
	UserRepository userRepository;

	@GetMapping("/myBalance")
	public void getBalanace(@RequestParam String username) {
		User user=userRepository.findByUserName(username);
	}
	
	 @PostMapping("/add-balance")
	  public ResponseEntity<String> addBalance(@RequestBody AddBalanceRequest request) {
	    Optional<User> user = Optional.of(userRepository.findByUserName(request.getUserName()));
	    if (user.isPresent()) {
	      User updatedUser = user.get();
	      float bal=request.getAmount();
	      Float newbal=updatedUser.getBalance()+bal;
	      updatedUser.setBalance(newbal);
	      userRepository.save(updatedUser);
	      return ResponseEntity.ok("Balance added successfully");
	    } else {
	      return ResponseEntity.notFound().build();
	    }
	 }
	 public class AddBalanceRequest {
		  private String userName;
		  private float amount;
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public float getAmount() {
			return amount;
		}
		public void setAmount(float amount) {
			this.amount = amount;
		}
		}
}
