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
    private store : Store<TournamentList>,
    private adminService : AdminService,
    private toastr : ToastrService,
    private cofirmService : NgConfirmService,
    private matDialog : MatDialog
  ){}

  tournamentsList$ !: Observable<Tournaments[]>;
  filteredTournaments: Tournaments[] = [];
  
  ngOnInit(): void {
    this.store.dispatch(retrieveTournaments())
    this.tournamentsList$ = this.store.pipe(select(TournamentsData));

    this.tournamentsList$.subscribe(tournaments => {
      this.filteredTournaments = this.filterWaitingTournaments(tournaments);
    });  
  }

  getLogoUrl(logoimage:string){
    return `${environment.User_API_Key}/files/${logoimage}`
  }

  getPosterImage(posterImage:string){
    return `${environment.User_API_Key}/files/${posterImage}`
  }

  filterWaitingTournaments(tournaments: Tournaments[]): Tournaments[] {
    return tournaments.filter(tournament => tournament.is_approuve === 'waiting');
  }
  
  approveTournament(id:string,tournamentName:string):void{
    
    this.cofirmService.showConfirm(`Are you sure want to approve this ${tournamentName} `,
    ()=>{
      this.adminService.ApproveAction(id).subscribe((res) =>{
          this.toastr.success("succesfull approved tournament")
          this.ngOnInit()
      },(err) => {
        if(err.error.massage){
          this.toastr.error(err.error.message)
        }else{
          this.toastr.error('something went wrong')
        }
      })

    },() => {
      
    })
   
  }

  rejectTournament(id:string , tournamentName:string):void{

    const dialogRef = this.matDialog.open(PopupComponent,{
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
        this.toastr.success("rejected tournament successfully")
      }
    })
  }

}
