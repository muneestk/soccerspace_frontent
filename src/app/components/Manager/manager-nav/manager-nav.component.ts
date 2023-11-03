import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css']
})
export class ManagerNavComponent {
   
  constructor(
    private router:Router,
    ){}

  logout():void{
      localStorage.removeItem('managerSecret')
      window.location.reload()
      this.router.navigate(['/manager'])
  }
}
