import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { managerData } from '../../state/app.selecter';
import { ManagerList } from '../../state/app.state';
import { retrieveManagers } from '../../state/app.action';
import { NgConfirmService } from 'ng-confirm-box';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Managers } from '../../modal/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<ManagerList>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private confirmService: NgConfirmService
  ) {}

  managerList$!: Observable<Managers[]>;
  jwt!: string | null;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource<Managers>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const token = localStorage.getItem('adminSecret');
    this.store.dispatch(retrieveManagers());

    // Subscribe to the managerList$ observable
    this.managerList$ = this.store.pipe(select(managerData));
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.managerList$.subscribe((data: Managers[]) => {
      this.dataSource.data = data;
    });
  }

  blockManager(id: string, name: string): void {
    this.confirmService.showConfirm(`are you sure want to block ${name} ?`,
    () => {
      this.adminService.blockManager(id)
      .subscribe((res) => {
        this.store.dispatch(retrieveManagers())
        this.toastr.success('manager blocked successfully')
      },(err) =>{
        if(err.error.massage){
          this.toastr.error(err.error.message)
        }else{
          this.toastr.error('something went wrong')
        }
      })
    },()=>{

    }
  )

   }

  unBlockManager(id: string): void {
    this.adminService.unBlockManager(id)
    .subscribe((res) => {
      this.store.dispatch(retrieveManagers())
      this.toastr.success('manager unblocked successfully')
    },(err) =>{
      if(err.error.massage){
        this.toastr.error(err.error.message)
      }else{
        this.toastr.error('something went wrong')
      }
    })
    }

 

}
