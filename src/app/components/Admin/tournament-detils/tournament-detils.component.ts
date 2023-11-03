import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { retrieveTournaments } from '../../state/app.action';
import { Tournaments } from '../../modal/model';
import { TournamentsData } from '../../state/app.selecter';
import { TournamentList } from '../../state/app.state';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-tournament-detils',
  templateUrl: './tournament-detils.component.html',
  styleUrls: ['./tournament-detils.component.css']
})
export class TournamentDetilsComponent implements OnInit {

  constructor(
    private _store : Store<TournamentList>,
    private _activatedRoute : ActivatedRoute 
    ){}

  
  tournamentDetail$ !: Observable<Tournaments | undefined> ;

  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments())

    const id =this._activatedRoute.snapshot.paramMap.get('id')
    if(id) {
      this.tournamentDetail$ = this._store.pipe(
        select(TournamentsData),
        map(tournaments => tournaments.find(t => t._id === id))
      )
    }
    
  }

  
  getLogo(logo: string): string {
    return `${environment.User_API_Key}/files/${logo}`;
  }

  getPoster(poster: string): string {
    return `${environment.User_API_Key}/files/${poster}`;
  }


  
}
