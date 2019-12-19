import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { ExcelUploadComponent } from './file-upload/excel-upload/excel-upload.component';
import { AuthGuard } from './site/auth.guard';
import { ProfileComponent } from './site/profile/profile.component';
import { CompanyComponent } from './stock/company/company.component';
import { ChartsComponent } from './stock/charts/charts.component';
import { ChartCompareComponent } from './stock/chart-compare/chart-compare.component';


const routes: Routes = [
  {path:'signup', component: SignupComponent},
  {path:'login/:userName', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: LoginComponent},
  {path:'excel-upload', component: ExcelUploadComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'company-list', component: CompanyComponent, canActivate: [AuthGuard]},
  {path:'charts/:code', component: ChartsComponent, canActivate: [AuthGuard]},
  {path:'charts', component: ChartsComponent, canActivate: [AuthGuard]},
  {path:'chart-compare', component: ChartCompareComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
