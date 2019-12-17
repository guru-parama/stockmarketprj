import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  passwordFlag: boolean;
  newUser: User = {
    id: null,
    userName: "",
    password: "",
    email: "",
    mobileNumber: "",
    confiremd: null
  };
  userFlag: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      mobileNumber : new FormControl('',[Validators.required]),
    })

    
}

  passMatch(){
    if(this.userForm.value.password == this.userForm.value.confirmPassword ){
      this.passwordFlag = true;
    }
    else
      this.passwordFlag = false;
  }

  signup(){
    this.newUser.userName = this.userForm.value.userName;
    this.newUser.email = this.userForm.value.email;
    this.newUser.mobileNumber = this.userForm.value.mobileNumber;
    this.newUser.password = this.userForm.value.password;
    this.newUser.confiremd = this.userForm.value.confiremd;
    this.userService.addUser(this.newUser).subscribe(response=>{
    this.router.navigate(['login']);
  },
    error=>{
      if(error.status==406)
        this.userFlag = true;
    });
  }


}
