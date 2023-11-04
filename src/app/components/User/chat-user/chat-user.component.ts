import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io-client';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit,OnDestroy {


  private _subscription:Subscription = new Subscription()

  constructor(
    private _userService : UserService,
    private _socket : Socket
  ){}
  
  ngOnInit(): void {
    
  }




  ngOnDestroy(): void {
    
  }
}
