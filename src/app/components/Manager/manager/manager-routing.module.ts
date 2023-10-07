import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';
import { ManagerSignupComponent } from '../manager-signup/manager-signup.component';
import { ManagerLoginComponent } from '../manager-login/manager-login.component';
import { VerifyManagerComponent } from '../verify-manager/verify-manager.component';
import { ManagerGuardLog, ManagerGuardOut, ManagerGuardcon  } from '../../guard/manager.guard';
import { ManagerProfileComponent } from '../manager-profile/manager-profile.component';
import { AddTournamentComponent } from '../add-tournament/add-tournament.component';

const routes: Routes = [
  { path: '', component:ManagerLoginComponent ,canActivate:[ManagerGuardOut,ManagerGuardcon]},
  { path: 'register', component:ManagerSignupComponent ,canActivate:[ManagerGuardOut,ManagerGuardcon]},
  { path: 'manangerverify/:id', component:VerifyManagerComponent,canActivate:[ManagerGuardOut,ManagerGuardcon] },
  { path: 'home', component:ManagerHomeComponent ,canActivate:[ManagerGuardLog]},
  { path: 'managerProfile', component:ManagerProfileComponent ,canActivate:[ManagerGuardLog]},
  { path: 'addTournament', component:AddTournamentComponent ,canActivate:[ManagerGuardLog]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ManagerRoutingModule {


 }
