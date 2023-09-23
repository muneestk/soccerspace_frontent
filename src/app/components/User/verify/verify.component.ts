import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  constructor(private router : Router){

  }


  toLogin():void
  {
    this.router.navigate(['/login'])
  }

}
