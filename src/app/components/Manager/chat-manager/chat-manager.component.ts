import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ManagerService } from 'src/app/service/manager.service';
import { Users } from '../../modal/model';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.css']
})
export class ChatManagerComponent implements OnInit,OnDestroy {
  
  private _subscription:Subscription = new Subscription()
  usetList$ !: Users[] 
  managerId !: string
  private _socket !: Socket ; 
  userId !: string ;
  userName !: string ;
  connectionId !: string ;
  messages !: any[] ;
  chatShow : boolean = false ;  


  constructor(
    private _managerService : ManagerService,
  ){}
  

  ngOnInit(): void {
    this.getChatList()
  }

  getChatList(){
    this._subscription.add(
      this._managerService.getChatLIst().subscribe({
        next:(res)=>{
          this.usetList$ = res.managetcontact
          this.managerId= res.managerId
        }
    })
    )
  }



  fullchat(id:string,name:string){
    this.managerId = id
    this.userName = name
    console.log(this.userName,'in manager');
    this._managerService.getFullChat(id).subscribe({
      next:(res) =>{
        this._socket.emit('join',res.cid)
        this.messages = res.messages
        this.connectionId = res.cid
        this.userId = res.userId
      }
    })
  }



  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
