package com.cognizant.companyservice.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table (name = "stock_exchange")
public class StockExchange {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ex_id")
	private int id;
	@Column(name = "ex_brief")
	private String brief;
	@Column(name = "ex_address")
	private String address;
	@Column(name = "ex-remarks")
	private String remarks;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(	name = "company_stock",
				joinColumns = @JoinColumn(name = "cs_ex_id"),
				inverseJoinColumns = @JoinColumn(name="cs_cp_id"))
	private Set<Company> comapnyList;

}
