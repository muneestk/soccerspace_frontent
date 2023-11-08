import { Component, Input } from '@angular/core';
import { Managers } from 'src/app/components/modal/model';
import { ChatUserComponent } from '../chat-user.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{

  constructor(
    private _chatcomponent:ChatUserComponent
  ){}

  ManagerList$ !: Managers[]
  @Input() data!:any

  fullchat(id:string,name:string){
    this._chatcomponent.fullchat(id,name)
  }


}
