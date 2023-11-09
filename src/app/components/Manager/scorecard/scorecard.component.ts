import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ManagerService } from 'src/app/service/manager.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit,AfterViewInit{

  goalScorers!: any[];

  constructor(private _managerService : ManagerService,private _toastr : ToastrService,private _route : ActivatedRoute ) {}

  
  displayedColumns: string[] = ['position', 'team', 'name', 'weight'];
  dataSource = new MatTableDataSource<any>(this.goalScorers);

  ngOnInit() {

    let id:any = this._route.snapshot.paramMap.get('id')
   this._managerService.getGoalScorers(id).subscribe({
    next:(res)=>{
      this.goalScorers=res
      this.dataSource.data = this.goalScorers; 
      console.log(res,'jjj');
    },
    error:(err) =>{
      if(err.error.message){
        this._toastr.error(err.error.message)
      }else{
        this._toastr.error("internal server eroor")
      }
    }
   })
  
  }

  getImage(image:string):string{
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${image}`
  }
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
