import { Component, Input } from '@angular/core';
import { ChatManagerComponent } from '../chat-manager.component';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent{


  @Input() data:any

  constructor(
    private _chatComponent : ChatManagerComponent
  ){}

  fullchat(id:string,name:string){
    this._chatComponent.fullchat(id,name)
  }



}
