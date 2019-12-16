import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  addUser(newUser: User){
    return this.httpClient.post<User>('http://localhost:8086/userauth-service/stockmarket/signup', newUser);
  }
 

}
