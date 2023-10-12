import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit,AfterViewInit{

  constructor(
    private store:Store<TournamentList>,
    private router : Router
  ){}

  tournamentList$ !: Observable<Tournaments[]>
  displayedColumns: string[] = ['No.', 'Tournament Name', 'Date', 'Status','Reason','Details'];
  dataSource = new MatTableDataSource<Tournaments>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {
    this.store.dispatch(retrieveTournaments())

    this.tournamentList$ = this.store.pipe(select(TournamentsData))
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  
    this.tournamentList$.subscribe((data: Tournaments[]) => {
      data.sort((a, b) => new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()); 
      this.dataSource.data = data;
    });
  }


  viewDetails(id: string): void {
    this.router.navigate(['/manager/singleTournament',id])
  }

  


}
