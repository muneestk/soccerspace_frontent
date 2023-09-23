import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ManagerListComponent } from '../manager-list/manager-list.component';

const routes: Routes = [
  { path: '', component:AdminLoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'managerList', component: ManagerListComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
