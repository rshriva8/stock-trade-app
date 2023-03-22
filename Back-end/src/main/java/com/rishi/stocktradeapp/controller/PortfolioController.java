package com.rishi.stocktradeapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {

	@GetMapping("/myPortfolio")
	public String getPortfolioDetails() {
		return "My Portfolio Details";
	}
}
