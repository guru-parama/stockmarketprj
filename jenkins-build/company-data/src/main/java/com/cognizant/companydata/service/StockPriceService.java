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
	
	public StockPriceService(StockPriceRepository stockPriceRepository) {
		super();
		this.stockPriceRepository = stockPriceRepository;
	}

	@Transactional
	public List<StockPrice> getAllStockPrice(long companyCode) {
		return stockPriceRepository.getAllStockPrice(companyCode);
	}
	
	@Transactional
	public List<StockPrice> getLatestStock(long companyCode){
		return stockPriceRepository.getStockPrice(companyCode);
	}
}
