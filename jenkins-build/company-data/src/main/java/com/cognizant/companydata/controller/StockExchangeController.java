package com.cognizant.companydata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companydata.model.StockExchange;
import com.cognizant.companydata.service.StockExchangeService;

@RestController
@RequestMapping("/stockmarket")
public class StockExchangeController {

	@Autowired
	StockExchangeService stockExchangeService; 
	
	@GetMapping("/stockexchange-list")
	public List<StockExchange> getList(){
		return stockExchangeService.getAllStockExchange();
	}
}
