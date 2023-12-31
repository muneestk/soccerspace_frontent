import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { UserService } from 'src/app/service/user.service';
import { Managers } from '../../modal/model';
import { ToastrService } from 'ngx-toastr';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit, OnDestroy,AfterViewChecked  {

  @ViewChild('scrollMe') private myScrollContainer !: ElementRef 
  

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  private _subscription: Subscription = new Subscription();
  private _socket !: Socket<DefaultEventsMap, DefaultEventsMap> 
  ManagerList$ !: Managers[] ;
  managerId !: string ;
  userId : string = '' ;
  managerName !: string ;
  connectionId : string = '';
  messages !: any[] ;
  chatShow : boolean = false ;  
  message : string = ''


  constructor(
    private _userService: UserService,
    private _toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.getChatList()
  this._socket = io(environment.NEXT_PUBLIC_User_API_Key)

    this._socket.on('messageRecieved',(newMessage:any)=>{
      if(this.userId == newMessage.reciever){
        this.messages.push(newMessage )
      }
    })    

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
    this.managerId = id
    this.managerName = name
    this.chatShow = true
    this._userService.getFullChat(id).subscribe({
      next:(res) =>{
        console.log('join',res.cid);
        
        this._socket.emit('join',res.cid)
        this.messages = res.messages
        this.connectionId = res.cid
        this.userId = res.userId

      }
    })
  }

  submit() {
    if (this.message === "") {
      this._toastr.error('please type something');
    } else {
      const data = {
        connectionid: this.connectionId,
        from: this.userId,
        to: this.managerId,
        message: this.message
      };
  
      this._userService.sentmessage(data)
        .subscribe((res) => {
          this.message = '';
          this.messages.push(res);
          this._socket.emit('chatMessage', res );
  
     
        });
    }
  }
 
  
  
  ngOnDestroy(): void {
    this._subscription.unsubscribe(); 
  }
}
