import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { UserService } from 'src/app/service/user.service';
import { Managers } from '../../modal/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  private _socket !: Socket ; 
  ManagerList$ !: Managers[] ;
  managerId !: string ;
  userId !: string ;
  managerName !: string ;
  connectionId !: string ;
  messages !: any[] ;
  chatShow : boolean = true ;  
  message !: string


  constructor(
    private _userService: UserService,
    private _toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.getChatList()
    // this._socket = io('http://localhost:3000'); 
  }

  getChatList(){
    this._subscription.add(
      this._userService.getChatLIst().subscribe({
        next:(res) => {
          this.ManagerList$ = res.userContact
          this._socket.emit('setup',res.userId)
          }
      })
    )
  }

  fullchat(id:string,name:string){
    alert('hi')
    this.managerId = id
    this.managerName = name
    console.log(this.managerName,'h');
    this._userService.getFullChat(id).subscribe({
      next:(res) =>{
        this._socket.emit('join',res.cid)
        this.messages = res.messages
        this.connectionId = res.cid
        this.userId = res.userId

      }
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); 
  }

  submit(){
    if(!this.message){
      this._toastr.error('please type something')
    }else{
      const data = {
        connectionid:this.connectionId,
        from:this.userId,
        to:this.managerId,
        message:this.message
      }
      this._userservice.sentmessage(data)
      .subscribe((res)=>{
        this.message = ''
        this.messages.push(res);
        this._socket.emit('chatMessage',res)
      })
    }
    }

  }
}
