package com.rishi.stocktradeapp.controller;


import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.config.JWTTokenHelper;
import com.rishi.stocktradeapp.dao.MarketScheduleRepository;
import com.rishi.stocktradeapp.dao.OrderRepository;
import com.rishi.stocktradeapp.dao.OwnershipRepository;
import com.rishi.stocktradeapp.dao.StockDailyRepository;
import com.rishi.stocktradeapp.dao.StockRepository;
import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.MarketSchedule;
import com.rishi.stocktradeapp.entity.Ownership;
import com.rishi.stocktradeapp.entity.Stock;
import com.rishi.stocktradeapp.entity.Transaction;
import com.rishi.stocktradeapp.entity.User;
import com.rishi.stocktradeapp.requests.AuthenticationRequest;
import com.rishi.stocktradeapp.responses.LoginResponse;
import com.rishi.stocktradeapp.responses.StockInfo;
import com.rishi.stocktradeapp.responses.UserInfo;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	JWTTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StockDailyRepository stockDailyRepository;
	
	@Autowired
    private MarketScheduleRepository marketScheduleRepository;

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {

		final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUserName(), authenticationRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		User user=(User)authentication.getPrincipal();
		String jwtToken=jwtTokenHelper.generateToken(user.getUsername());
		
		LoginResponse response=new LoginResponse();
		response.setToken(jwtToken);
		

		return ResponseEntity.ok(response);
	}
	@PostMapping("/set-schedule")
	  public MarketSchedule createMarketHours(@RequestBody MarketSchedule marketHours) {
	    return marketScheduleRepository.save(marketHours);
	  }
	
	
	
	@GetMapping("/auth/userinfo")
	public ResponseEntity<?> getUserInfo(Principal user){
		User userObj=(User) userDetailsService.loadUserByUsername(user.getName());
		
		UserInfo userInfo=new UserInfo();
		userInfo.setFirstName(userObj.getFirstName());
		userInfo.setLastName(userObj.getLastName());
		userInfo.setUserName(userObj.getUsername());
		userInfo.setEmail(userObj.getEmail());
		userInfo.setId(userObj.getId());
		userInfo.setPhoneNumber(userObj.getPhoneNumber());
		userInfo.setBalance(userObj.getBalance());
		userInfo.setRoles(userObj.getAuthorities().toArray());
		
		
		return ResponseEntity.ok(userInfo);

	}
	@GetMapping("/auth/getbalance")
	public ResponseEntity<?> getUserBalance(Principal user){
		User userObj=(User) userDetailsService.loadUserByUsername(user.getName());
		
		UserInfo userInfo=new UserInfo();
		userInfo.setFirstName(userObj.getFirstName());
		userInfo.setLastName(userObj.getLastName());
		userInfo.setUserName(userObj.getUsername());
		userInfo.setEmail(userObj.getEmail());
		userInfo.setPhoneNumber(userObj.getPhoneNumber());
		userInfo.setBalance(userObj.getBalance());
		
		return ResponseEntity.ok(userInfo);

	}
	@GetMapping("/auth/withdraw")
	public ResponseEntity<?> withdrawBalance(Principal user, @RequestParam("amount") float amount){
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		float balance = userObj.getBalance();
		Transaction transaction=new Transaction();
	    transaction.setOrderType("WITHDRAWAL");
	    transaction.setTotalPrice(amount);
	    transaction.setUser(userObj);
	    orderRepository.save(transaction);
		balance = balance - amount;
		userObj.setBalance(balance);
		userRepository.save(userObj);
		return ResponseEntity.ok(userObj);
	}
	
	@GetMapping("/auth/deposit")
	public ResponseEntity<?> setUserBalance(Principal user, @RequestParam("amount") float amount){
	    User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
	    Transaction transaction=new Transaction();
	    transaction.setOrderType("DEPOSIT");
	    transaction.setTotalPrice(amount);
	    transaction.setUser(userObj);
	    orderRepository.save(transaction);
	    float balance = userObj.getBalance();
	    balance += amount;
	    userObj.setBalance(balance);
	    userRepository.save(userObj);
	    return ResponseEntity.ok(userObj);
	}
	
	@GetMapping("/auth/buystock")
	public ResponseEntity<?> buyStock(Principal user, @RequestParam("volume") int volume, @RequestParam("stockId") int stockId,
			@RequestParam("value") String val){
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		double value=Double.parseDouble(val);
		float balance = userObj.getBalance();
		int userId=userObj.getId();
		Transaction transaction=new Transaction();
		transaction.setStock(stockRepository.findById(stockId));
		transaction.setUser(userObj);
		transaction.setOpenPrice(value);
		transaction.setOrderTimestamp(LocalDateTime.now());
		transaction.setOrderType("BUY");
		transaction.setOrderVolume(volume);
		transaction.setTotalPrice(volume*value);
		orderRepository.save(transaction);
		Stock stock=stockRepository.findById(stockId);
		stock.setStockVolume(stock.getStockVolume()-volume);
		stockRepository.save(stock);
		balance -= (value*volume);
		userObj.setBalance(balance);
		userRepository.save(userObj);
		return ResponseEntity.ok(userObj);
	}
	@GetMapping("/auth/sellstock")
	public ResponseEntity<?> sellStock(Principal user, @RequestParam("volume") int volume, @RequestParam("stockId") int stockId,
			@RequestParam("value") String val){
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		double value=Double.parseDouble(val);
		float balance = userObj.getBalance();
		int userId=userObj.getId();
		Transaction transaction=new Transaction();
		transaction.setStock(stockRepository.findById(stockId));
		transaction.setUser(userObj);
		transaction.setOpenPrice(value);
		transaction.setOrderTimestamp(LocalDateTime.now());
		transaction.setOrderType("SELL");
		transaction.setOrderVolume(volume);
		transaction.setTotalPrice(volume*value);
		orderRepository.save(transaction);
		Stock stock=stockRepository.findById(stockId);
		stock.setStockVolume(stock.getStockVolume()+volume);
		stockRepository.save(stock);
		balance += (value*volume);
		userObj.setBalance(balance);
		userRepository.save(userObj);
		return ResponseEntity.ok(userObj);
	}
	@GetMapping("/auth/stockdata")
	public List<StockInfo> getStockInfo() {
	    List<Stock> stocks = stockRepository.findAll();
	    List<StockInfo> stockInfoList = new ArrayList<>();
	    for (Stock stock : stocks) {
	        double dailyLow = stockDailyRepository.findDailyLowByStockIdAndTodayDate(stock.getId());
	        double dailyHigh = stockDailyRepository.findDailyHighByStockIdAndTodayDate(stock.getId());
	        StockInfo stockInfo = new StockInfo(stock.getId(), stock.getStockName(), stock.getStockValue(), dailyLow, dailyHigh, stock.getStockVolume());
	        stockInfoList.add(stockInfo);
	    }
	    return stockInfoList;
	}

	
	@Autowired
	OwnershipRepository ownershipRepository;
	@GetMapping("/auth/myportfolio")
	public List<Ownership> getRowsByUserId(Principal user) {
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		int userId=userObj.getId();
	    return ownershipRepository.findByUserId(userId);
	}
	@GetMapping("/auth/myhistory")
	public List<Transaction> getHistory(Principal user) {
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
		int userId=userObj.getId();
		List<Transaction> history=orderRepository.findByUserId(userId);
		Collections.reverse(history);
		return history;
	}
}