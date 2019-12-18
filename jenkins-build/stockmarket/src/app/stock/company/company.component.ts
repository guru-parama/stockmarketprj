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
  filteredList: Company[];
  searchString: string;
  company: Company;
  stockDetailsLatestList: any[];

  constructor(private companyService: CompanyService) {
    this.companyService.getAllCompanies().subscribe(response =>{
      this.companyList = response;
      this.filteredList = this.companyList;
    });
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
}
