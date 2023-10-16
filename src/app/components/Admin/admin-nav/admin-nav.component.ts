import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private _router : Router){}

  @Input() item = 0

  ngOnInit(): void {
    
  }

  logOut():void{
    localStorage.removeItem('adminSecret')
    this._router.navigate(['/admin'])
  }
}
