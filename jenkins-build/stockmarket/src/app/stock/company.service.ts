import { Injectable } from '@angular/core';
import { AuthenticateService } from '../site/authenticate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private authenticateService: AuthenticateService, private httpClient: HttpClient) { }

  getAllCompanies(){
    let token = "Bearer "+ this.authenticateService.getToken();
    const httpOption = { headers : new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token})};
    return this.httpClient.get<Company[]>('http://localhost:8086/company-data/stockmarket/get-company', httpOption);
  }

  getStockLatest(code){
    let token = "Bearer "+ this.authenticateService.getToken();
    const httpOption = { headers : new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token})};
    return this.httpClient.get<any>('http://localhost:8086/company-data/stockmarket/stock-price/latest/'+code , httpOption);
  }
}
