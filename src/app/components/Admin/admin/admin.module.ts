import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ManagerListComponent } from '../manager-list/manager-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {NgConfirmModule} from 'ng-confirm-box';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApprouvalsComponent } from '../approuvals/approuvals.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { AdminSidebarnavComponent } from '../admin-sidebarnav/admin-sidebarnav.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    UserListComponent,
    ManagerListComponent,
    ApprouvalsComponent,
    TournamentListComponent,
    AdminSidebarnavComponent,

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
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    CanvasJSAngularChartsModule,
    MatSelectModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminModule { }
