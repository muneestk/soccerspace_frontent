import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mytournaments',
  templateUrl: './mytournaments.component.html',
  styleUrls: ['./mytournaments.component.css']
})
export class MytournamentsComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'Actions', 'details'];
  dataSource: MatTableDataSource<any>;

  selectedValue:string | undefined

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subscription: Subscription = new Subscription();

  constructor(private _userService: UserService, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<any>();
  }


  
  ngOnInit(): void {
    this.subscription.add(
      this._userService.myTournaments().subscribe(
        (res) => {
          this.dataSource.data = res;
        },
        (err) => {
          this._toastr.error(err.error.message);
        }
      )
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
  applyFilterSatatus(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
