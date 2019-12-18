package com.cognizant.companydata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companydata.model.StockPrice;
import com.cognizant.companydata.service.StockPriceService;

@RestController
@RequestMapping("/stockmarket")
public class StockPriceController {

	@Autowired
	StockPriceService stockPriceService;
	@GetMapping("/stock-price")
	public List<StockPrice> getAllStockList() {
		return stockPriceService.getAllStockPrice();
	}
	
}
