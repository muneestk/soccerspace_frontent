import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Managers } from 'src/app/components/modal/model';
import { UserService } from 'src/app/service/user.service';
import { ChatUserComponent } from '../chat-user.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,OnDestroy{

  constructor(
    private _userService : UserService,
    private _chatcomponent:ChatUserComponent
  ){}

  ManagerList$ !: Managers[]
  @Input() data!:any

  private _subscription : Subscription = new Subscription()

  ngOnInit(): void {
  }


  

  fullchat(id:string,name:string){
    this._chatcomponent.fullchat(id,name)
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
