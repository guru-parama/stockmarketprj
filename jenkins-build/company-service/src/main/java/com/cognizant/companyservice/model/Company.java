package com.cognizant.companyservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "company")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cp_id")
	private int id;
	@Column (name = "cp_code")
	private String code;
	@Column (name = "cp_name")
	private String name;
	@Column (name = "cp_turnover")
	private String turnover;
	@Column (name = "cp_ceo")
	private String ceo;
	@Column (name = "cp_listed")
	private boolean listed;
	@Column (name = "cp_brief")
	private String breif;
}
