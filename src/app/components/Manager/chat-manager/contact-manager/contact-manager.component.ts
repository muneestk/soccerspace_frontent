import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit,OnDestroy{

  private _subscription :Subscription = new Subscription()

  @Input() data:any
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

}
