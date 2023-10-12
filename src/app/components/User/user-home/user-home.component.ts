import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  approveTournament !: Tournaments[]

  constructor(
    private store : Store<TournamentList>,
    private router : Router,
    private toastr : ToastrService,
  ){}



  ngOnInit(): void {
    this.store.dispatch(retrieveTournaments())

    this.tournamentList$ = this.store.pipe(select(TournamentsData))

    this.tournamentList$.subscribe((tournments => {
      this.approveTournament = this.filterapproveTournaments(tournments).slice(0,4)
    }))
  }


  
  filterapproveTournaments(tournaments: Tournaments[]): Tournaments[] {
    return tournaments.filter(tournament => tournament.is_approuve === 'approved');
  }

  getPosterImage(posterImage:string):string{
    return `${environment.User_API_Key}/files/${posterImage}` 
  }

}
