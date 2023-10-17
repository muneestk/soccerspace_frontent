import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';
import { ManagerSignupComponent } from '../manager-signup/manager-signup.component';
import { ManagerLoginComponent } from '../manager-login/manager-login.component';
import { VerifyManagerComponent } from '../verify-manager/verify-manager.component';
import { ManagerGuardLog, ManagerGuardOut, ManagerGuardcon  } from '../../guard/manager.guard';
import { ManagerProfileComponent } from '../manager-profile/manager-profile.component';
import { AddTournamentComponent } from '../add-tournament/add-tournament.component';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { SingleTournamentListComponent } from '../single-tournament-list/single-tournament-list.component';
import { ForgotPasswordComponent } from '../../User/forgot-password/forgot-password.component';
import { RegisteredTeamsComponent } from '../registered-teams/registered-teams.component';

const routes: Routes = [
  { path: '', component:ManagerLoginComponent ,canActivate:[ManagerGuardOut,ManagerGuardcon]},
  { path: 'register', component:ManagerSignupComponent ,canActivate:[ManagerGuardOut,ManagerGuardcon]},
  { path: 'manangerverify/:id', component:VerifyManagerComponent,canActivate:[ManagerGuardOut,ManagerGuardcon] },
  { path: 'forgotPassword', component:ForgotPasswordComponent ,canActivate:[ManagerGuardOut]},
  { path: 'home', component:ManagerHomeComponent ,canActivate:[ManagerGuardLog]},
  { path: 'managerProfile', component:ManagerProfileComponent ,canActivate:[ManagerGuardLog]},
  { path: 'addTournament', component:AddTournamentComponent ,canActivate:[ManagerGuardLog]},
  { path: 'tournamentList', component:TournamentListComponent ,canActivate:[ManagerGuardLog]},
  { path: 'singleTournament/:id', component:SingleTournamentListComponent ,canActivate:[ManagerGuardLog]},
  { path: 'registerdTeams/:id', component:RegisteredTeamsComponent ,canActivate:[ManagerGuardLog]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class ManagerRoutingModule {


 }
