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
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SigleTournamentDetailsComponent } from '../sigle-tournament-details/sigle-tournament-details.component';
import { RegisterTournamentComponent } from '../register-tournament/register-tournament.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatIconModule } from '@angular/material/icon';
import { ExploretournamentComponent } from '../exploretournament/exploretournament.component';
import { MytournamentsComponent } from '../mytournaments/mytournaments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MyTournamentSingleDetailsComponent } from '../my-tournament-single-details/my-tournament-single-details.component';
import { MyTournamentRgisterdTeamsComponent } from '../my-tournament-rgisterd-teams/my-tournament-rgisterd-teams.component';





@NgModule({
  declarations: [
    UserRoutingComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    UsernavComponent,
    FooterComponent,
    VerifyComponent,
    UserProfileComponent,
    SigleTournamentDetailsComponent,
    RegisterTournamentComponent,
    ForgotPasswordComponent,
    ExploretournamentComponent,
    MytournamentsComponent,
    MyTournamentSingleDetailsComponent,
    MyTournamentRgisterdTeamsComponent,


  ],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    GoogleSigninButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule

  ],
  
})
export class UserRoutingModule { }
