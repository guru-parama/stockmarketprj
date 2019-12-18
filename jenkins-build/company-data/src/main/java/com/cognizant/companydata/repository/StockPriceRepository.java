package com.cognizant.companydata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognizant.companydata.model.StockPrice;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice,String> {

	@Query(value="select * from stock_price group by sp_date",nativeQuery = true)
	public List<StockPrice> getAllStockPrice();
	
	@Query(value="SELECT * FROM stock_market.stock_price WHERE sp_date = CURDATE() AND sp_code=?1 GROUP BY (sp_stock_exchange);",nativeQuery = true)
	public List<StockPrice> getStockPrice(long companyCode);
	
}
