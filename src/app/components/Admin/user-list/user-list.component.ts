import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { uniqueUser } from '../../state/app.selecter';
import { retrieveUsers } from '../../state/app.action';
import { UserList } from '../../state/app.state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
   
  constructor(
    private store : Store<UserList>,
    private adminService : AdminService,
    private toastr : ToastrService
  ){}

  usersList$ = this.store.pipe(select(uniqueUser))
  jwt !: string | null ;

  ngOnInit(): void {
    this.jwt = localStorage.getItem('adminSecret')
    // if(this.jwt){
      this.store.dispatch(retrieveUsers())
    // }
      console.log(this.usersList$,'ngrx');
  }

  unBlockUser(id:string):void{
    this.adminService.unBlockUser(id)
    .subscribe((res) =>{
      this.store.dispatch(retrieveUsers())
      this.toastr.success("user unblocked successfully")
    },
    (err) =>{
       this.toastr.error("something went wrong")
    })
  }


  blockUser(id:string):void{
    this.adminService.blockUser(id)
    .subscribe((res) =>{
      this.store.dispatch(retrieveUsers())
      this.toastr.success("user blocked successfully")
    },
    (err) =>{
       this.toastr.error("something went wrong")
    })
  }

}
