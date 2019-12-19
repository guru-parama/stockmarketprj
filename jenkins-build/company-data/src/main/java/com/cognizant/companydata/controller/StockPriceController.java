package com.cognizant.companydata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companydata.model.StockPrice;
import com.cognizant.companydata.service.StockPriceService;

@RestController
@RequestMapping("/stockmarket")
public class StockPriceController {

	@Autowired
	StockPriceService stockPriceService;
	@GetMapping("/stock-price/{companyCode}")
	public List<StockPrice> getAllStockList(@PathVariable long companyCode) {
		return stockPriceService.getAllStockPrice(companyCode);
	}
	
	@GetMapping("/stock-price/latest/{companyCode}")
	public List<StockPrice> getLatest(@PathVariable long companyCode) {
		return stockPriceService.getLatestStock(companyCode);
	}
	
}
