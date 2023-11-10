import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';
import { ManagerSignupComponent } from '../manager-signup/manager-signup.component';
import { ManagerLoginComponent } from '../manager-login/manager-login.component';
import { VerifyManagerComponent } from '../verify-manager/verify-manager.component';
import { ManagerNavComponent } from '../manager-nav/manager-nav.component';
import { ManagerFooterComponent } from '../manager-footer/manager-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { ManagerProfileComponent } from '../manager-profile/manager-profile.component';
import { AddTournamentComponent } from '../add-tournament/add-tournament.component';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SingleTournamentListComponent } from '../single-tournament-list/single-tournament-list.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ForgotPasswordManagerComponent } from '../forgot-password-manager/forgot-password-manager.component';
import { RegisteredTeamsComponent } from '../registered-teams/registered-teams.component';
import { ManagerService } from 'src/app/service/manager.service';
import { FxtureComponent } from '../fxture/fxture.component';
import { MatButtonModule } from '@angular/material/button';
import { ScorecardComponent } from '../scorecard/scorecard.component';
import { ChatManagerComponent } from '../chat-manager/chat-manager.component';
import { ContactManagerComponent } from '../chat-manager/contact-manager/contact-manager.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.development';




@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerSignupComponent,
    ManagerLoginComponent,
    VerifyManagerComponent,
    ManagerNavComponent,
    ManagerFooterComponent,
    ManagerProfileComponent,
    AddTournamentComponent,
    TournamentListComponent,
    SingleTournamentListComponent,
    ForgotPasswordManagerComponent,
    RegisteredTeamsComponent,
    FxtureComponent,
    ScorecardComponent,
    ChatManagerComponent,
    ContactManagerComponent,

  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    GoogleSigninButtonModule,
    MatButtonModule,
    SocketIoModule.forRoot({url:'http://localhost:3000'})
    
  ],
  providers:[
    ManagerService
  ]
  
})
export class ManagerModule { }
