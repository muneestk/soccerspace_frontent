import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { MatSort } from '@angular/material/sort';
import { ManagerService } from 'src/app/service/manager.service';



@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit,AfterViewInit{

  constructor(
    private _store:Store<TournamentList>,
    private _router : Router,
    private _managerService : ManagerService
  ){}

  tournamentList$ !: Observable<Tournaments[]>
  displayedColumns: string[] = ['No.', 'Tournament Name', 'Date', 'Status','Reason','Details'];
  dataSource = new MatTableDataSource<Tournaments>(); 
  managerId : any 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {


  this._store.dispatch(retrieveTournaments());

  combineLatest([
    this._store.pipe(select(TournamentsData)),
    this._managerService.findManger()
  ]).pipe(
    tap(([tournaments, managerData]) => {
      this.managerId = managerData.id;
      const filteredTournaments = tournaments.filter(t => t.managerId === this.managerId);
      this.dataSource.data = filteredTournaments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  ).subscribe();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  
    // this.tournamentList$.subscribe((data: Tournaments[]) => {
    //   data.sort((a, b) => new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()); 
    //   this.dataSource.data = data;
    // });
  }

    


  viewDetails(id: string): void {
    this._router.navigate(['/manager/singleTournament',id])
  }

  getMangerId(){
    this._managerService.findManger().subscribe((res) => {
      this.managerId = res.id
    })
  }
  


}
