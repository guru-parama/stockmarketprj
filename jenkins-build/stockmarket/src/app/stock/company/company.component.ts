import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyList: Company[];

  constructor(private companyService: CompanyService) {
    this.companyService.getAllCompanies().subscribe(response =>{
      this.companyList = response;
      console.log(this.companyList);
    });
   }

  ngOnInit() {
   
  }

}
