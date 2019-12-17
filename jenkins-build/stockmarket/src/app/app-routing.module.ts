import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { ExcelUploadComponent } from './file-upload/excel-upload/excel-upload.component';


const routes: Routes = [
  {path:'signup', component: SignupComponent},
  {path:'login/:userName', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'excel-upload', component: ExcelUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
