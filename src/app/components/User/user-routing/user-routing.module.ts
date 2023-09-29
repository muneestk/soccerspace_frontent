import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingRoutingModule } from './user-routing-routing.module';
import { UserRoutingComponent } from './user-routing.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UsernavComponent } from '../usernav/usernav.component';
import { FooterComponent } from '../footer/footer.component';
import { VerifyComponent } from '../verify/verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    UserRoutingComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    UsernavComponent,
    FooterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
})
export class UserRoutingModule { }
