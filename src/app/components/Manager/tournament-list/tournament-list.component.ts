import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { Router } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit,AfterViewInit,OnDestroy{

  constructor(
    private _store:Store<TournamentList>,
    private _router : Router,
  ){}

  private _subscrition:Subscription = new Subscription()
  tournamentList$ !: Observable<Tournaments[]>
  displayedColumns: string[] = ['No.', 'Tournament Name', 'Date', 'Status','Reason','Details'];
  dataSource = new MatTableDataSource<Tournaments>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments());

    let token:any = localStorage.getItem("managerSecret")
    const decoded:any = jwtDecode(token)
    const managerId:string = decoded._id

    this.tournamentList$ = this._store.pipe(select(TournamentsData),
    map(tournaments => tournaments.filter(t => t.managerId === managerId)))

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this._subscrition.add(
          this.tournamentList$.subscribe((data: Tournaments[]) => {
          this.dataSource.data = data;
        })
      )
  }
    


  viewDetails(id: string): void {
    this._router.navigate(['/manager/singleTournament',id])
  }

  ngOnDestroy(): void {
    this._subscrition.unsubscribe()
  }



}
