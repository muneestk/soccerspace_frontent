import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { VerifyComponent } from '../verify/verify.component';
import { UserGuardLog, UserGuardcon, UserGuardOut } from '../../guard/user-guard.guard';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { RegisterTournamentComponent } from '../register-tournament/register-tournament.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MytournamentsComponent } from '../mytournaments/mytournaments.component';
import { MyTournamentSingleDetailsComponent } from '../my-tournament-single-details/my-tournament-single-details.component';
import { MyTournamentRgisterdTeamsComponent } from '../my-tournament-rgisterd-teams/my-tournament-rgisterd-teams.component';
import { ExploreSideNavComponent } from '../explore-side-nav/explore-side-nav.component';
import { FixtureUserComponent } from '../fixture-user/fixture-user.component';
import { ChatUserComponent } from '../chat-user/chat-user.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate : [UserGuardOut] },
  { path: 'login', component: LoginComponent , canActivate : [UserGuardcon,UserGuardLog] },
  { path: 'register', component: SignupComponent , canActivate : [UserGuardcon,UserGuardLog]},
  { path: 'verify', component: VerifyComponent , canActivate : [UserGuardcon,UserGuardLog]},
  { path: 'forgotpassword', component: ForgotPasswordComponent , canActivate : [UserGuardcon,UserGuardLog]},
  { path: 'forgotpassword/:id/:token', component: ForgotPasswordComponent , canActivate : [UserGuardcon,UserGuardLog]},
  { path: 'login/:id/:token', component: LoginComponent, canActivate : [UserGuardcon,UserGuardLog] },
  { path: 'profile', component: UserProfileComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'registerTournament/:id', component: RegisterTournamentComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'myTournaments', component: MytournamentsComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'myTournamentsSingleDetails/:id', component: MyTournamentSingleDetailsComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'myTournamentsTeams/:id', component: MyTournamentRgisterdTeamsComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'explore', component: ExploreSideNavComponent, canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'fixture/:id', component: FixtureUserComponent , canActivate : [UserGuardOut,UserGuardcon] },
  { path: 'chat', component: ChatUserComponent , canActivate : [UserGuardOut,UserGuardcon] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingRoutingModule { }
