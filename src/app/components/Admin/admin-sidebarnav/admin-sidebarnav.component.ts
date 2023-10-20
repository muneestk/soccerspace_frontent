import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';

@Component({
  selector: 'app-admin-sidebarnav',
  templateUrl: './admin-sidebarnav.component.html',
  styleUrls: ['./admin-sidebarnav.component.css']
})
export class AdminSidebarnavComponent implements OnInit {
  private _breakpointObserver = inject(BreakpointObserver);
  private _router = inject(Router);

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      private _store : Store<TournamentList>

    ){}

    approvalLength : number = 0


    ngOnInit(): void {
      this._store.dispatch(retrieveTournaments())


      this._store.pipe(select(TournamentsData),
      map(m => m.filter(item => item.is_approuve === 'waiting').length)
    ).subscribe(approvalLength => {
      this.approvalLength = approvalLength;
    });
    
      
    }



    logout():void{
      localStorage.removeItem('adminSecret')
      this._router.navigate(['/admin'])
    }

}
