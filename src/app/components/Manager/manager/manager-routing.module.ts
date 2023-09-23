import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';
import { ManagerSignupComponent } from '../manager-signup/manager-signup.component';
import { ManagerLoginComponent } from '../manager-login/manager-login.component';
import { VerifyManagerComponent } from '../verify-manager/verify-manager.component';

const routes: Routes = [
  { path: '', component:ManagerLoginComponent },
  { path: 'home', component:ManagerHomeComponent },
  { path: 'register', component:ManagerSignupComponent },
  { path: 'manangerverify/:id', component:VerifyManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ManagerRoutingModule {


 }
