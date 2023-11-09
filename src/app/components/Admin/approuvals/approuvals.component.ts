import { Component, OnInit } from '@angular/core';
import { TournamentList } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';
import { Observable } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-approuvals',
  templateUrl: './approuvals.component.html',
  styleUrls: ['./approuvals.component.css']
})
export class ApprouvalsComponent implements OnInit {


  constructor(
    private _store : Store<TournamentList>,
    private _adminService : AdminService,
    private _toastr : ToastrService,
    private _cofirmService : NgConfirmService,
    private _matDialog : MatDialog
  ){}

  tournamentsList$ !: Observable<Tournaments[]>;
  filteredTournaments: Tournaments[] = [];
  isLoading:boolean = true;

  
  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments())
    this.tournamentsList$ = this._store.pipe(select(TournamentsData));

    this.tournamentsList$.subscribe(tournaments => {
      this.filteredTournaments = this.filterWaitingTournaments(tournaments);
    }); 
     
  }

  getLogoUrl(logoimage:string){
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${logoimage}`
  }

  getPosterImage(posterImage:string){
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${posterImage}`
  }

  filterWaitingTournaments(tournaments: Tournaments[]): Tournaments[] {
    return tournaments.filter(tournament => tournament.is_approuve === 'waiting');
  }
  
  approveTournament(id:string,tournamentName:string):void{
    
    this._cofirmService.showConfirm(`Are you sure want to approve this ${tournamentName} `,
    ()=>{
      this._adminService.ApproveAction(id).subscribe((res) =>{
          this._toastr.success("succesfull approved tournament")
          this.ngOnInit()
      },(err) => {
        if(err.error.massage){
          this._toastr.error(err.error.message)
        }else{
          this._toastr.error('something went wrong')
        }
      })

    },() => {
      
    })
   
  }

  rejectTournament(id:string , tournamentName:string):void{

    const dialogRef = this._matDialog.open(PopupComponent,{
      width:'40%',
      height:'250px',
      data:{
        title:"Reject Tournament",
        tournamentName  :tournamentName,
        id
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit()
        this._toastr.success("rejected tournament successfully")
      }
    })
  }

}
