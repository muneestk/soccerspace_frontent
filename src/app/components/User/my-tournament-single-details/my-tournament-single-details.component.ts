import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Tournaments } from '../../modal/model';
import { Observable, map } from 'rxjs';
import { TournamentsData } from '../../state/app.selecter';
import { TournamentList } from '../../state/app.state';
import { retrieveTournaments } from '../../state/app.action';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-my-tournament-single-details',
  templateUrl: './my-tournament-single-details.component.html',
  styleUrls: ['./my-tournament-single-details.component.css']
})
export class MyTournamentSingleDetailsComponent implements OnInit {

  constructor(
    private _store : Store<TournamentList>,
    private _route : ActivatedRoute
  ){}

  tournamentList$ !: Observable<Tournaments | undefined>
  validDate : boolean = false

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id')

    this._store.dispatch(retrieveTournaments())
    this.tournamentList$ = this._store.pipe(select(TournamentsData),
    map(tournaments => tournaments.find(t => t._id === id)))
  }

  getLogoUrl(logoimage: string): string {
    return `${environment.User_API_Key}/files/${logoimage}`;
  }

  getPosterImage(posterImage: string): string {
    return `${environment.User_API_Key}/files/${posterImage}`;
  }

  getDaysLeft(tournamentDate: any): number {
    const oneDay = 24 * 60 * 60 * 1000; 
    const todayTime = new Date().getTime();
    const tournamentTime = new Date(tournamentDate).getTime();
    const differenceDays = Math.round((tournamentTime - todayTime) / oneDay);
    if(differenceDays<=0){
      this.validDate = true
    }
    return differenceDays;
  }

}
