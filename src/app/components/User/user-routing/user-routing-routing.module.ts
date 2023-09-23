import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { VerifyComponent } from '../verify/verify.component';
import { UserGuardLog, UserGuardcon, UserGuardOut } from '../../guard/user-guard.guard';

const routes: Routes = [
  { path: '', component: UserHomeComponent,canActivate :[UserGuardOut] },
  { path: 'login', component: LoginComponent , canActivate : [UserGuardcon,UserGuardLog] },
  { path: 'register', component: SignupComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login/:id', component: LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingRoutingModule { }
