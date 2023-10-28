import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Subscription, map } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements AfterViewInit, OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','SLOTS', 'Actions'];
  dataSource: MatTableDataSource<any>;

  selectedValue:string | undefined

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subscription: Subscription = new Subscription();

  constructor(private _store:Store<TournamentList>, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<any>();
  }


  
  ngOnInit(): void {

   this._store.dispatch(retrieveTournaments())
   this._store.pipe(
    select(TournamentsData),
    map(tournaments => tournaments.filter(tournament => tournament.is_approuve !== 'waiting'))
  ).subscribe(filteredTournaments => {
    this.dataSource.data = filteredTournaments; 
  });
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
