import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {



  tournamentList$ !: Observable<Tournaments[]>
  livetournamentList$ !: Observable<Tournaments[]>
  approveTournament !: Tournaments[]
  tournamentDetail !: Tournaments

  constructor(
    private _store : Store<TournamentList>,
  ){}

  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments());

  
    this.tournamentList$ = this._store.pipe(select(TournamentsData));
  
    this.tournamentList$.subscribe((tournaments) => {
      this.approveTournament = this.filterApproveTournaments(tournaments).slice(0, 4);
    });

    this.livetournamentList$ = this._store.pipe(
      select(TournamentsData),
      map(tournament => tournament.filter(x => x.slots === x.Teams.length))
    );
    
  }
  
  filterApproveTournaments(tournaments: Tournaments[]): Tournaments[] {
    const today = new Date().getTime();
    return tournaments.filter(
      (tournament) => tournament.is_approuve === 'approved' && new Date(tournament.tournamentDate).getTime() >= today
    );
  }
  
  getPosterImage(posterImage:string):string{
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${posterImage}` 
  }

}
