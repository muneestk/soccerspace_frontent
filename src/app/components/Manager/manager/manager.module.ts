import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
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




@NgModule({
  declarations: [
    ManagerComponent,
    ManagerHomeComponent,
    ManagerSignupComponent,
    ManagerLoginComponent,
    VerifyManagerComponent,
    ManagerNavComponent,
    ManagerFooterComponent,
    ManagerProfileComponent,
    AddTournamentComponent,
    TournamentListComponent,
    SingleTournamentListComponent

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
    
  ]
})
export class ManagerModule { }
