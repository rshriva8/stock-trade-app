package com.rishi.stocktradeapp;

import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.rishi.stocktradeapp.dao.StockRepository;
import com.rishi.stocktradeapp.dao.UserRepository;
import com.rishi.stocktradeapp.entity.Stock;

@SpringBootApplication
@EnableScheduling
public class StocktradeappApplication {
	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userDetailsRepository;
	
	Logger logger=LoggerFactory.getLogger(StocktradeappApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(StocktradeappApplication.class, args);
	}
	
	@Scheduled(fixedDelay = 5000)
	  //@Scheduled(fixedRate = 5000)  //Or use this
	  public void run()
	  {
		List<Stock> stocks=stockRepository.findAll();
		for(Stock stock:stocks) {
			double price = stock.getStockValue();
			int max=2;
			int min=1;
			double new_price=price-(new Random().nextBoolean() ? ((Math.random() * (max - min)) + min) : (-1)*((Math.random() * (max - min)) + min));
			if(new_price<0) new_price=0;
			stock.setStockValue(new_price);
            stockRepository.save(stock);
        }
	    logger.info("=======================Stocks Updated!!=============== ");
	  }
	
//	@PostConstruct
//	protected void init() {
//		
//		List<Authority> authorityList=new ArrayList<>();
//		
//		authorityList.add(createAuthority("USER","User role"));
//		authorityList.add(createAuthority("ADMIN","Admin role"));
//		
//		User user=new User();
//		
//		user.setUserName("rishi");
//		user.setFirstName("Rishi");
//		user.setLastName("Shrivastava");
//		user.setPassword(passwordEncoder.encode("rishi@123"));
//		user.setAuthorities(authorityList);
//		user.setEnabled(true);
//		user.setBalance(1000);
//		userDetailsRepository.save(user);
//		logger.info("=======================USER Updated!!================ ");
//		
//	}
//	private Authority createAuthority(String roleCode,String roleDescription) {
//		Authority authority=new Authority();
//		authority.setRoleCode(roleCode);
//		authority.setRoleDescription(roleDescription);
//		return authority;
//	}

}