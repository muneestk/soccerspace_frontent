import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ManagerListComponent } from '../manager-list/manager-list.component';
import {
  AdminGuardLog,
  AdminGuardOut,
  AdminGuardcon,
} from '../../guard/admin.guard';
import { ApprouvalsComponent } from '../approuvals/approuvals.component';
import { AdminSidebarnavComponent } from '../admin-sidebarnav/admin-sidebarnav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent,
    canActivate: [AdminGuardcon, AdminGuardOut],
  },
  {
    path: 'dashboard',
    component: AdminSidebarnavComponent,
    canActivate: [AdminGuardLog],
    children: [
      {
        path: 'userList',
        component: UserListComponent,
        canActivate: [AdminGuardLog],
      },
      {
        path: 'managerList',
        component: ManagerListComponent,
        canActivate: [AdminGuardLog],
      },
      {
        path: 'approvals',
        component: ApprouvalsComponent,
        canActivate: [AdminGuardLog],
      },
      {
        path: 'charts',
        component: DashboardComponent,
        canActivate: [AdminGuardLog],
      },
      {
        path: 'tournamentList',
        component: TournamentListComponent,
        canActivate: [AdminGuardLog],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
