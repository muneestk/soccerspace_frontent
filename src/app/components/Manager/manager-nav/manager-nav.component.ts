import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css']
})
export class ManagerNavComponent {
   
  constructor(
    private router:Router,
    private toast : ToastrService
    ){}

  logout():void{
      localStorage.removeItem('managerSecret')
      this.toast.success('logout success')
      this.router.navigate(['/manager'])
  }
}
