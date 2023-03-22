package com.rishi.stocktradeapp.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.dao.HolidayRepository;
import com.rishi.stocktradeapp.entity.Holiday;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class HolidayController {
	
	@Autowired
	HolidayRepository holidayRepository;
	
	@GetMapping("/declare-holiday")
	public Holiday declareHoliday(@RequestParam("date") String date) throws ParseException {
		SimpleDateFormat formatter1=new SimpleDateFormat("yyyy-MM-dd");  
		Date d1=formatter1.parse(date);
		Holiday holiday=new Holiday();
		holiday.setDate(d1);
	    return holidayRepository.save(holiday);
	  }
	
	@GetMapping("/check-holiday")
	public boolean checkHoliday(@RequestParam("date") String date) throws ParseException {
		SimpleDateFormat formatter1=new SimpleDateFormat("yyyy-MM-dd");  
		Date d1=formatter1.parse(date);
		Optional<Holiday> holiday = holidayRepository.findByDate(d1);
        if (holiday.isPresent()) {
        	return true;
        } else {
            return false;
        }
    }
}
