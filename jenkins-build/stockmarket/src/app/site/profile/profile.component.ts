import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  profileEditForm: FormGroup;
  editPasswordFlag: boolean;
  passwordFlag: boolean;
  verifyFlag: boolean;

  constructor(private userService: UserService, 
      private authService: AuthService, 
      private authenticateService: AuthenticateService,
      private router: Router) {
    userService.getUser(authService.getUserName()).subscribe(response =>{
      this.user = response;
    })
   }

  ngOnInit() {
    this.profileEditForm = new FormGroup ({
      oldPassword: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    });
  }

  editPassword(){
    this.editPasswordFlag = true;
  }
  
  passMatch(){
    if(this.profileEditForm.value.password == this.profileEditForm.value.confirmPassword ){
      this.passwordFlag = true;
    }
    else
      this.passwordFlag = false;
  }

  verify(password){
    this.authenticateService.authenticate(this.user.username, this.profileEditForm.value.oldPassword).subscribe(response =>{
      this.verifyFlag = true;
    })
  }

  submit(){
    this.user.password = this.profileEditForm.value.password;
    this.userService.updateUser(this.user).subscribe(response =>{
        this.router.navigate(['excel-upload']);
    });
  }
}
