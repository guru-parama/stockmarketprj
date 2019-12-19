import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './site/signup/signup.component';
import { HeaderComponent } from './site/header/header.component';
import { LoginComponent } from './site/login/login.component';
import { SummaryComponent } from './file-upload/summary/summary.component';
import { ExcelUploadComponent } from './file-upload/excel-upload/excel-upload.component';
import { ProfileComponent } from './site/profile/profile.component';
import { CompanyComponent } from './stock/company/company.component';
import { ChartsComponent } from './stock/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    SummaryComponent,
    ExcelUploadComponent,
    ProfileComponent,
    CompanyComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
