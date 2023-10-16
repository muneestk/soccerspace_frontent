import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],

})
export class AdminSidebarComponent implements OnInit{

  constructor(
   private _store : Store<TournamentList>
  ){}

  ngOnInit(): void {
  }


  showFiller = false;
}
