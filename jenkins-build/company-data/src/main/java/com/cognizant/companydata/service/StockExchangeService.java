package com.cognizant.companydata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companydata.model.StockExchange;
import com.cognizant.companydata.repository.StockExchangeRepository;

@Service
public class StockExchangeService {

	@Autowired
	StockExchangeRepository exchangeRepository;
	
	
	
	public StockExchangeService(StockExchangeRepository exchangeRepository) {
		super();
		this.exchangeRepository = exchangeRepository;
	}



	public List<StockExchange> getAllStockExchange(){
		return exchangeRepository.findAll(); 
	}
}
