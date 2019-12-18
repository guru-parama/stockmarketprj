package com.cognizant.companydata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.companydata.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String>{

}
