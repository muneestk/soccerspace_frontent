import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/User/user-routing/user-routing.module').then(m => m.UserRoutingModule) },
  { path: 'manager', loadChildren: () => import('./components/Manager/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'admin', loadChildren: () => import('./components/Admin/admin/admin.module').then(m => m.AdminModule) },
  { path:'**',component:ErrorPageComponent}
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
