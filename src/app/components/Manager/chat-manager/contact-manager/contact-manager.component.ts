import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatManagerComponent } from '../chat-manager.component';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit,OnDestroy{

  private _subscription :Subscription = new Subscription()

  @Input() data:any

  constructor(
    private _chatComponent : ChatManagerComponent
  ){}
  
  ngOnInit(): void {
    
  }

  fullchat(id:string,name:string){
    this._chatComponent.fullchat(id,name)
  }

  ngOnDestroy(): void {
    
  }

}
