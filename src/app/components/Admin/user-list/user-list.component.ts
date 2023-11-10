import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { allUser } from '../../state/app.selecter';
import { retrieveUsers } from '../../state/app.action';
import { UserList } from '../../state/app.state';
import { NgConfirmService } from 'ng-confirm-box';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Users } from '../../modal/model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {
   
  constructor(
    private _store : Store<UserList>,
    private _adminService : AdminService,
    private _toastr : ToastrService,
    private _cofirmService : NgConfirmService
  ){}

  private _subscription : Subscription = new Subscription()
  usersList$ !: Observable<Users[]>;
  jwt !: string | null ;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource<Users>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._subscription.add(
      this.usersList$.subscribe((data: Users[]) => {
        this.dataSource.data = data;
      })
    )
  }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('adminSecret')
      this._store.dispatch(retrieveUsers())
      this.usersList$ = this._store.pipe(select(allUser));
  }

  unBlockUser(id:string):void{
    this._subscription.add(
      this._adminService.unBlockUser(id)
      .subscribe((res) =>{
        this._store.dispatch(retrieveUsers())
        this._toastr.success("user unblocked successfully")
      },
      (err) =>{
         this._toastr.error("something went wrong")
      })
    )
  }


  blockUser(id:string,name:string):void{

    this._cofirmService.showConfirm(`are You sure want to block ${name} ?`,
      ()=>{
        this._subscription.add(
         this._adminService.blockUser(id)
          .subscribe((res) =>{
            this._store.dispatch(retrieveUsers())
            this._toastr.success("user blocked successfully")
          },
          (err) =>{
             this._toastr.error("something went wrong")
          })
        )
      },()=>{
        this._cofirmService.closeConfirm()
      }
    )


  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
