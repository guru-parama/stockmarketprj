package com.cognizant.companydata.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "board_members")
public class BoardOfDirectors {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bm_id")
	private int id;
	
	@Column(name = "bm_cp_name")
	private String name;
	
	@Column(name = "bm_cp_id")
	private int companyId;

	public BoardOfDirectors() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public BoardOfDirectors(int id, String name, int companyId) {
		super();
		this.id = id;
		this.name = name;
		this.companyId = companyId;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	

	
	
}
