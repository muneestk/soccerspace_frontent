import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.css']
})
export class ChatManagerComponent implements OnInit,OnDestroy {
  
  private _subscription:Subscription = new Subscription()

  constructor(
    private _managerService : ManagerService,
    private _socket : Socket
  ){}
  

  ngOnInit(): void {
    
  }




  ngOnDestroy(): void {
    
  }
}
