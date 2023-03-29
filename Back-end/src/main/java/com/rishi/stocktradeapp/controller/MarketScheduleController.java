package com.rishi.stocktradeapp.controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.dao.MarketScheduleRepository;
import com.rishi.stocktradeapp.entity.MarketSchedule;

@RestController
@RequestMapping("/market-hours")
@CrossOrigin
public class MarketScheduleController {
	
	@Autowired
	MarketScheduleRepository marketScheduleRepository;

	@GetMapping("/set")
	  public List<MarketSchedule> createMarketHours(@RequestParam("dayOfWeek") int dayOfWeek,
			  @RequestParam("openingTime") String openTime,
			  @RequestParam("closingTime") String closeTime
			  ) {
		LocalTime openingTime=LocalTime.parse(openTime,DateTimeFormatter.ofPattern("HH:mm:ss"));
		LocalTime closingTime=LocalTime.parse(closeTime, DateTimeFormatter.ofPattern("HH:mm:ss"));
		Optional<MarketSchedule> existingMarketSchedule = marketScheduleRepository.findByOpenDaysOfWeek(dayOfWeek);
      if (existingMarketSchedule.isPresent()) {
      	MarketSchedule updatedMarketSchedule = existingMarketSchedule.get();
      	updatedMarketSchedule.setOpeningTime(openingTime);
      	updatedMarketSchedule.setClosingTime(closingTime);
      	marketScheduleRepository.save(updatedMarketSchedule);
      	return marketScheduleRepository.findAll();
      }
      	MarketSchedule marketSchedule=new MarketSchedule();
  		marketSchedule.setOpenDaysOfWeek(dayOfWeek);
  		marketSchedule.setOpeningTime(openingTime);
  		marketSchedule.setClosingTime(closingTime);
      	marketScheduleRepository.save(marketSchedule);
      	return marketScheduleRepository.findAll();
	  }
	
    @GetMapping("/marketSchedule")
    public List<MarketSchedule> getMarketSchedule() {
        return marketScheduleRepository.findAll();
    }
    
    @GetMapping("/delete")
    public List<MarketSchedule> deleteSchedule(@RequestParam("id") int id) {
    	Optional<MarketSchedule> existingMarketSchedule = marketScheduleRepository.findById(id);
    	 if (existingMarketSchedule.isPresent()) {
    	      	MarketSchedule updatedMarketSchedule = existingMarketSchedule.get();
    	      	marketScheduleRepository.delete(updatedMarketSchedule);
    	 }
    	 return marketScheduleRepository.findAll();
    }
	
}
