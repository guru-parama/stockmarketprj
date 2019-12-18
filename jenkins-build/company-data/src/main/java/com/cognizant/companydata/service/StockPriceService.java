package com.cognizant.companydata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.companydata.model.StockPrice;
import com.cognizant.companydata.repository.StockPriceRepository;

@Service
public class StockPriceService {

	@Autowired
	StockPriceRepository stockPriceRepository;
	
	@Transactional
	public List<StockPrice> getAllStockPrice() {
		return stockPriceRepository.findAll();
	}
}
