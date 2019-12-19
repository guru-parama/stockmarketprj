import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { StockExchange } from '../stockExchange';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyList: Company[];
  filteredList: Company[];
  searchString: string;
  company: Company;
  stockDetailsLatestList: any[];
  stockExchangeList: StockExchange[];
  sortType: string;

  constructor(private companyService: CompanyService, private router: Router) {
    this.companyService.getAllCompanies().subscribe(response =>{
      this.companyList = response;
      this.filteredList = this.companyList;
    });
    companyService.getAllStockExchanges().subscribe(response =>{
      this.stockExchangeList = response;
    })
   }

  ngOnInit() {
   
  }

  filter(){
    this.filteredList = this.companyList.filter((company: Company) => company
                      .name
                      .toLocaleLowerCase()
                      .indexOf(this.searchString) != -1
    );
  }

  get(){
    if(this.sortType == "select"){
      this.filteredList = this.companyList;
    } else{
    this.filteredList = [];
    this.companyList.forEach(comp =>{
      comp.stockExchangeList.forEach(comp1 =>{
        if(comp1.name == this.sortType)
          this.filteredList.push(comp);
      })
    })
  }
  }
  
  getCompanyDetails(id){
    this.companyList.forEach(comp =>{
      if(comp.id == id){
        this.company = comp;
      }
    });
    this.companyService.getStockLatest(this.company.companyCode).subscribe(response =>{
      this.stockDetailsLatestList = response;
    })
  }

  plot(companyCode){
    this.router.navigate(['charts',companyCode]);
  }
}
