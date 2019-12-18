import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from '../site/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private httpClient:HttpClient, private authenticateService: AuthenticateService) { }

  showSummary(){
    let token = "Bearer "+ this.authenticateService.getToken();
    const httpOption = { headers : new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token})};
    return this.httpClient.get("http://localhost:8086/file-upload-service/stockmarket/summary", httpOption)
  }
}
