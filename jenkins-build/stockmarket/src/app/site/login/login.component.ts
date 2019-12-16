import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthenticateService } from '../authenticate.service';
import { User } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFlag: boolean;
  user: User[];
  favouriteFlag: boolean;

  constructor(private userService: UserService
    , private router: Router
    , private userAuth: AuthService
    , private activeRoute: ActivatedRoute
    , private authenticateService: AuthenticateService) {}

  ngOnInit() {
    this.loginForm = new FormGroup ({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });

    if(this.activeRoute.snapshot.paramMap.get('userName') == 'null'){
      this.favouriteFlag = true;
    }
  }

  login(){
    this.authenticateService.authenticate(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(response => {
        this.userAuth.setUserName(this.loginForm.value.userName);
        this.authenticateService.setToken(response.token);
        this.userAuth.login();        
        this.userAuth.setRole(response.role);
      })
  
  }

}
