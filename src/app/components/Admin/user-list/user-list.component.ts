import { Component, OnInit,AfterViewInit, ViewChild  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { allUser } from '../../state/app.selecter';
import { retrieveUsers } from '../../state/app.action';
import { UserList } from '../../state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { PopupAdminComponent } from '../popup-admin/popup-admin.component';
import { NgConfirmService } from 'ng-confirm-box';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Users } from '../../modal/model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
   
  constructor(
    private store : Store<UserList>,
    private adminService : AdminService,
    private toastr : ToastrService,
    private matDialog : MatDialog,
    private cofirmService : NgConfirmService
  ){}

  usersList$ !: Observable<Users[]>;
  jwt !: string | null ;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource<Users>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.usersList$.subscribe((data: Users[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('adminSecret')
      this.store.dispatch(retrieveUsers())
      this.usersList$ = this.store.pipe(select(allUser));
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


  blockUser(id:string,name:string):void{

    this.cofirmService.showConfirm(`are You sure want to block ${name} ?`,
      ()=>{
        this.adminService.blockUser(id)
        .subscribe((res) =>{
          this.store.dispatch(retrieveUsers())
          this.toastr.success("user blocked successfully")
        },
        (err) =>{
           this.toastr.error("something went wrong")
        })
      },()=>{
        this.cofirmService.closeConfirm()
      }
    )


  }

  // openDialog(id:string):void{
  //   this.matDialog.open(PopupAdminComponent,{width:'30%',height:"200px",
  //    enterAnimationDuration:'500ms'
  // })
  // }

}
