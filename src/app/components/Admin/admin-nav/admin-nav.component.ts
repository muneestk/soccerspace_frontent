import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private router : Router){}

  ngOnInit(): void {
    
  }

  logOut():void{
    localStorage.removeItem('adminSecret')
    this.router.navigate(['/admin'])
  }
}
