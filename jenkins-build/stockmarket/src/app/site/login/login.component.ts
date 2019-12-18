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
  notConfirmedFlag: boolean;

  constructor(private userService: UserService
    , private router: Router
    , private userAuth: AuthService
    , private activeRoute: ActivatedRoute
    , private authenticateService: AuthenticateService) {}

  ngOnInit() {
    this.loginFlag = false;
    this.notConfirmedFlag = false;
    this.loginForm = new FormGroup ({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });

  }

  login(){
    this.authenticateService.authenticate(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(response => {
        
        if(response.confirmed == "true"){
          this.notConfirmedFlag = false;
          this.userAuth.setUserName(this.loginForm.value.userName);
          this.authenticateService.setToken(response.token);
          this.userAuth.login();        
          this.userAuth.setRole(response.role);
          this.loginFlag = false;
          this.notConfirmedFlag = false;
          this.router.navigate(['company-list']);
        }
        else{
          this.notConfirmedFlag = true;
        }
      }, error=>{
        if(error.status == 401){
          this.notConfirmedFlag = false;
          this.loginFlag = true;
        }
      })
  
  }

}
