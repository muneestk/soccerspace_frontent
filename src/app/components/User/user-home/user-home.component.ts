import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

   loading : boolean = true;


  tournamentList$ !: Observable<Tournaments[]>
  approveTournament !: Tournaments[]
  tournamentDetail !: Tournaments
  ngxLoadingAnimationTypes: any;

  constructor(
    private _store : Store<TournamentList>,
  ){}



  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments())

    this.tournamentList$ = this._store.pipe(select(TournamentsData))
    
    this.tournamentList$.subscribe((tournments => {
      this.approveTournament = this.filterApproveTournaments(tournments).slice(0,4)
    }))

  }

  filterApproveTournaments(tournaments: Tournaments[]): Tournaments[] {
    const today = new Date().getTime();
    return tournaments.filter(
      (tournament) => tournament.is_approuve === 'approved' && new Date(tournament.tournamentDate).getTime() <= today
    );
  }

  getPosterImage(posterImage:string):string{
    return `${environment.User_API_Key}/files/${posterImage}` 
  }

}
