package com.cognizant.companydata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.companydata.model.Company;
import com.cognizant.companydata.model.CompanyDTO;
import com.cognizant.companydata.repository.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	CompanyRepository companyRepository;
	
	@Transactional
	public List<Company> getAllCompanies() {
		CompanyDTO companyDTO = new CompanyDTO();
		companyDTO.setCompanyList(companyRepository.findAll());
		return companyRepository.findAll();
	}
}
