import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ManagerListComponent } from '../manager-list/manager-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupAdminComponent } from '../popup-admin/popup-admin.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AdminComponent,
    AdminFooterComponent,
    AdminLoginComponent,
    AdminNavComponent,
    AdminSidebarComponent,
    DashboardComponent,
    UserListComponent,
    ManagerListComponent,
    PopupAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    NgConfirmModule,
    MatTableModule,
    MatPaginatorModule
    ]
})
export class AdminModule { }
