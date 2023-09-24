import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { managerData } from '../../state/app.selecter';
import { ManagerList } from '../../state/app.state';
import { retrieveManagers } from '../../state/app.action';


@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  
  constructor(
    private store : Store<ManagerList>,
    private adminService : AdminService,
    private toastr : ToastrService
  ){}
  
  managerList$ = this.store.pipe(select(managerData))
  jwt !: string | null

  ngOnInit(): void {
    const token = localStorage.getItem('adminSecret')
    this.store.dispatch(retrieveManagers())
  }

  blockManager(id:string):void{
    this.adminService.blockManager(id)
    .subscribe((res) => {
      this.store.dispatch(retrieveManagers())
      this.toastr.show('manager blocked successfully')
    },(err) =>{
      if(err.error.massage){
        this.toastr.error(err.error.message)
      }else{
        this.toastr.error('something went wrong')
      }
    })
  }

  unBlockManager(id:string):void{
    this.adminService.unBlockManager(id)
    .subscribe((res) => {
      this.store.dispatch(retrieveManagers())
      this.toastr.show('manager unblocked successfully')
    },(err) =>{
      if(err.error.massage){
        this.toastr.error(err.error.message)
      }else{
        this.toastr.error('something went wrong')
      }
    })
  }


}
