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
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { ManagerProfileComponent } from '../manager-profile/manager-profile.component';




@NgModule({
  declarations: [
    ManagerComponent,
    ManagerHomeComponent,
    ManagerSignupComponent,
    ManagerLoginComponent,
    VerifyManagerComponent,
    ManagerNavComponent,
    ManagerFooterComponent,
    ManagerSidebarComponent,
    ManagerProfileComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTableModule


  ]
})
export class ManagerModule { }
