import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authenticateService: AuthenticateService) {
  }

  addUser(newUser: User){
    return this.httpClient.post<User>('http://localhost:8086/userauth-service/stockmarket/signup', newUser);
  }
 
  getUser(name){
    let token = "Bearer "+ this.authenticateService.getToken();
    const httpOption = { headers : new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token})};
    return this.httpClient.get<User>('http://localhost:8086/userauth-service/stockmarket/user/'+name, httpOption);
  }

  updateUser(user: User){
    let token = "Bearer "+ this.authenticateService.getToken();
    const httpOption = { headers : new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token})};
    return this.httpClient.put<User>('http://localhost:8086/userauth-service/stockmarket/user/',user , httpOption);
  }

}
