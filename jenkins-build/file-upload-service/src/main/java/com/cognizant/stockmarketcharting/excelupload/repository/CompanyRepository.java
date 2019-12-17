package com.cognizant.stockmarketcharting.excelupload.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.stockmarketcharting.excelupload.model.Company;



public interface CompanyRepository extends JpaRepository<Company, Integer> {
	
	@Query(value="select * from company where cp_code=?1 ",nativeQuery=true)
	public Company findByCompanyCode(Long companyCode);
	
}
