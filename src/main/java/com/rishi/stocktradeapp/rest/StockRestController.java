package com.rishi.stocktradeapp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.entity.Stock;
import com.rishi.stocktradeapp.service.StockService;

@RestController
@RequestMapping("/stocksapi")
public class StockRestController {
	
	private StockService stockService;
	
	@Autowired
	public StockRestController(StockService theStockService) {
		stockService=theStockService;
	}
	
	@GetMapping("/stocks")
	public List<Stock> findAll(){
		return stockService.findAll();
	}
	@GetMapping("/stocks/{stockId}")
	public Stock findById(@PathVariable int stockId){
		Stock theStock = stockService.findById(stockId);
		if(theStock==null) throw new RuntimeException("Stock ID not found - "+stockId);
		else return theStock;
	}
	@PostMapping("/stocks")
	public Stock saveStock(@RequestBody Stock theStock){
		theStock.setId(0);
		stockService.save(theStock);
		return theStock;
	}
	@PutMapping("/stocks")
	public Stock updateStock(@RequestBody Stock theStock) {
		stockService.save(theStock);
		return theStock;
	}
	@DeleteMapping("/stocks/{stockId}")
	public String deleteStock(@PathVariable int stockId) {
		Stock theStock = stockService.findById(stockId);
		if(theStock==null) throw new RuntimeException("User ID not found - "+stockId);
		else {
			stockService.deleteById(stockId);
		}
		return stockId+" has been deleted";
	}
}
