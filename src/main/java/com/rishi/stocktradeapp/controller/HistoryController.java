package com.rishi.stocktradeapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistoryController {

	@GetMapping("/myHistory")
	public String getHistoryDetails() {
		return "My History Details";
	}
}
