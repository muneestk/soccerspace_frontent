import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private router : Router){}

  authenticated : boolean = false

   
  ngOnInit(): void {
    let token = localStorage.getItem("userSecret")
    if(token) {
      this.authenticated = true
    }
  }

  logout():void{
    localStorage.removeItem('userSecret')
    this.router.navigate(['/login'])
  }
}
