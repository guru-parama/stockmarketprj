import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean;
  name: String = null;
  role: String = null;
  constructor(private authenticateService: AuthenticateService) {
    this.loggedIn = false;
   }

  login(){
    this.loggedIn= true;
  }
  setUserName(userInput: String){
    this.name = userInput;
  }
  getUserName(){
    return this.name;
  }
  setRole(role){
    this.role = role;
  }
  getRole(){
    return this.role;
  }
  logout(){
    this.name = null;
    this.loggedIn= false;
    this.role = null;
    this.authenticateService.setToken(null);
  }
  isLoggedin(){
    return this.loggedIn;
  }

}
