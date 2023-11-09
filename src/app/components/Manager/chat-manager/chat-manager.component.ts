import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Socket ,io } from 'socket.io-client';
import { ManagerService } from 'src/app/service/manager.service';
import { Users } from '../../modal/model';
import { ToastrService } from 'ngx-toastr';

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
  message : string = '';
   

  @ViewChild('scrollMe') private myScrollContainer !: ElementRef 
  

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  constructor(
    private _managerService : ManagerService,
    private _toastr:ToastrService
  ){}
  

  ngOnInit(): void {
    this.getChatList()
    this._socket = io('http://localhost:3000'); 

    this._socket.on('messageReceived',(newMessage:any)=>{
      console.log(newMessage,'in manager');
      if(this.userId == newMessage.from){
        this.messages.push(newMessage )
      }
    })    

  }

  getChatList(){
    this._subscription.add(
      this._managerService.getChatLIst().subscribe({
        next:(res)=>{
          this.usetList$ = res.managerContact
          this.managerId= res.managerId          
          this._socket.emit('setup',res.managerId)


        }
    })
    )
  }

  fullchat(id:string,name:string){
    this.userId = id
    this.userName = name
    this.chatShow = true
    this._managerService.getFullChat(id).subscribe({
      next:(res) =>{
        this._socket.emit('join',res.cid)
        this.messages = res.messages
        this.connectionId = res.cid
        this.managerId = res.managerId      
      }
    })
  }

  submit(){
    if(this.message === ""){
      this._toastr.error('please type something')
    }else{
      const data = {
        connectionid:this.connectionId,
        from:this.managerId,
        to:this.userId  ,
        message:this.message
      }
    this._managerService.sentmessage(data)
      .subscribe((res)=>{
        this.message = ''
        this.messages.push(res);
        this._socket.emit('chatMessage',res)

        this._socket.on('message recieved',(newMessage:any)=>{
          console.log(newMessage,'in manager');
          if(this.userId == newMessage.from){
            this.messages.push(newMessage )
          }
        })    
      })
    }
    }



 



  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
