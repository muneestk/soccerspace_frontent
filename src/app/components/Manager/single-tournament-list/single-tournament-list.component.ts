import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { TournamentList } from '../../state/app.state';
import { Observable, map } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-single-tournament-list',
  templateUrl: './single-tournament-list.component.html',
  styleUrls: ['./single-tournament-list.component.css']
})
export class SingleTournamentListComponent implements OnInit {

  constructor(
    private store: Store<TournamentList>,
    private route: ActivatedRoute
  ) {}

  tournamentId !: any;
  tournament$ !: Observable<Tournaments | undefined>;

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(retrieveTournaments());

    this.tournament$ = this.store.pipe(
      select(TournamentsData),
      map(tournaments => tournaments.find(t => t._id === this.tournamentId))
    );

  }

  getLogoUrl(logoimage:string):string{
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${logoimage}`
  }

  getPosterImage(posterImage:string):string{
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${posterImage}`
  }

}
