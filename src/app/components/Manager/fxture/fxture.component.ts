import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/service/manager.service';
import { environment } from 'src/environments/environment.development';
import { PopupComponent } from '../../popup/popup.component';


@Component({
  selector: 'app-fxture',
  templateUrl: './fxture.component.html',
  styleUrls: ['./fxture.component.css'],
})

export class FxtureComponent implements OnInit, OnDestroy {
  constructor(
    private _managerService: ManagerService,
    private _toastr: ToastrService,
    private _activeRouter: ActivatedRoute,
    private _dialogue:MatDialog

  ) {}

  private subscription : Subscription = new Subscription()
  firstRound:any
  secondRound:any
  thirdRound:any
  fourthRound:any
  fifthRound:any
  round!:number
  button:boolean = false

  ngOnInit(): void {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    const slots:any = this._activeRouter.snapshot.paramMap.get('slot');
    this.round = Math.log2(+slots)
    if (id) {
      this.loadTournament(id,this.round);
    }
  }

  loadTournament(id: string,round:number): void {
  this.subscription.add(
    this._managerService.getFixture(id).subscribe(
     (res) => {
      this.firstRound = res.fixtureData.find((tournament: { matchRound: number }) => tournament.matchRound === round);
      this.secondRound = res.fixtureData.find((tournament: { matchRound: number }) => tournament.matchRound === round-1);
      this.thirdRound = res.fixtureData.find((tournament: { matchRound: number }) => tournament.matchRound === round - 2);
      this.fourthRound = res.fixtureData.find((tournament: { matchRound: number }) => tournament.matchRound === round - 3);
      this.fifthRound = res.fixtureData.find((tournament: { matchRound: number }) => tournament.matchRound === round - 4);
     }
    )
  )
  }

  getLogo(logo:string):string{
    return `${environment.User_API_Key}/files/${logo}`
  }


  //update team score

  updateScore(match:any ,tournamentId:string){
    const tournamentDate = new Date(this.firstRound.tournamentId.tournamentDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
        
    if (
      currentDate.getFullYear() !== tournamentDate.getFullYear() ||
      currentDate.getMonth() !== tournamentDate.getMonth() ||
      currentDate.getDate() !== tournamentDate.getDate()
    ) {
      this._toastr.warning(
        "Only you can update that tournament date because of your exclusive access"
      );
    } else {
      const dilaog = this._dialogue.open(PopupComponent,{
        width : '60%',
        height : '550px',
        data:{
          title: 'Update Score',
          match,
          tournamentId
        }
      })

      dilaog.afterClosed().subscribe((result) => {
        if (result && result.updatedData) {
          this._toastr.success('Score updated successfully');
          this.ngOnInit()
        }
      });

    }
  }    

  shouldRenderSection(round:number): boolean {
    return this.firstRound.matches.length / round >= 1
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  updateRound(tournamentId: string) {
    
    let round!:number
    let checkData:any
    if(this.fifthRound){
      round = this.round - 4
      checkData = this.fifthRound
    }else if(this.fourthRound){
      round = this.round - 3
      checkData = this.fourthRound
    }else if(this.thirdRound){
      round = this.round - 2
      checkData = this.thirdRound
    }else if(this.secondRound){
      round = this.round - 1
      checkData = this.secondRound
    }else{
      round = this.round
      checkData = this.firstRound
    }
    if(round == 2){
      this.button = true
    }

    const notUpdatedMatches = checkData.matches.filter(
      (tournament: { matchStatus: string }) => tournament.matchStatus !== 'updated' && tournament.matchStatus !== 'updated'
    );
  
  
    if (notUpdatedMatches.length > 0) {
      this._toastr.warning('Every round must be updated');
    }else if(checkData.matches.length <= 1){
      this._toastr.warning('Every round updated');
    } else {
      this.subscription.add(
        this._managerService.updateRound({ round , tournamentId }).subscribe({
          next: () => {
            this.ngOnInit()
          },
          error: (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('Something went wrong');
            }
          },
        })
      );
    }
  }


  
}