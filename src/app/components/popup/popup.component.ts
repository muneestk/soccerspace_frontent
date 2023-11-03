import { Component,Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { ManagerService } from 'src/app/service/manager.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit,OnDestroy
 {
  inputData: any;
  editdata: any;
  useredit: boolean = false;
  rejectTournament: boolean = false;
  tournamentName : string = ''
  tournamentId : string = ''
  invalid : boolean = false
  viewScore : boolean = false
  teamId !: string
  teamscore :any[]=[]

  private _subscription:Subscription = new Subscription()

  formData = this._builder.group({
    name: this._builder.control(''),
    email: this._builder.control(''),
    reason: this._builder.control('',[Validators.required,Validators.minLength(5)]),
  });

 
  scoreForm = this._builder.group({
    scorername: this._builder.control('', [Validators.required]),
    teamId: this._builder.control(''),
  });


  constructor(
    private _ref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _builder: FormBuilder,
    private _managerService: ManagerService,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _adminService : AdminService,
    private _dialogue:MatDialog

  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    if (this.inputData.title == 'Manager Edit') {
      this.setManagerPopupdata();
    }

    if (this.inputData.title == 'User Edit') {
      this.setUserPopupdata();
      this.useredit = true;
    }

    if (this.inputData.title == 'Reject Tournament') {
      this.rejectTournament = true;
      this.tournamentName = this.inputData.tournamentName
      this.tournamentId = this.inputData.id
    }

    if(this.inputData.title == 'Update Score'){
      this.updateScore=true
      this.matchData = this.inputData.match
      this.tournamentId = this.inputData.tournamentId
      this.team1Score=this.matchData.team1Score
      this.team2Score=this.matchData.team2Score
    }

    if(this.inputData.title == 'View Score'){
      this.updateScore=true
      this.matchData = this.inputData.match
      console.log(this.matchData,'mkk');
      this.viewScore = true
      this.team1Score=this.matchData.team1Score
      this.team2Score=this.matchData.team2Score
    }

    if(this.inputData.title == 'Update Goal scorer'){
      this.updateGoalScrorer=true
      this.teamId = this.inputData.teamId
    }
  }

  setManagerPopupdata() {

    this._subscription.add(

      this._managerService.managerDetails().subscribe((res) => {
        this.editdata = res;
        this.formData.setValue({
          name: this.editdata.name,
          email: this.editdata.email,
          reason:''
        });
      })
    )

  }

  getArray(length: number): any[] {
    return new Array(length);
  }

  setUserPopupdata() {

    this._subscription.add(

      this._userService.userDetails().subscribe((res) => {
        this.editdata = res;
        this.formData.setValue({
          name: this.editdata.name,
          email: this.editdata.email,
          reason:''
        });
      })

    )


  }

  Saveuser() {

    const form = this.formData.getRawValue();

    if(this.rejectTournament){

      if(this.formData.valid){
         var data = {
          reason : form.reason,
          id:this.tournamentId
        }
        this._subscription.add(

          this._adminService.rejectTournamnet(data).subscribe(() => {
            this._ref.close({ updatedData: form });
          },
          (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('internal server error');
            }
          })

        )
      }else{
        this.invalid = true
    }

    }
    else if (this.useredit) {
      this._subscription.add(

        this._userService.saveUser(form).subscribe(
          (res) => {
            this._ref.close({ updatedData: form });
          },
          (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('internal server error');
            }
          }
        )
      )

    } else {
      
      this._subscription.add(
        this._managerService.saveManager(form).subscribe(
          (res) => {
            this._ref.close({ updatedData: form });
          },
          (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('internal server error');
            }
          }
        )
      )

     

    }
  }


  //update score

  selectedWinner:string=''
  updateScore : boolean = false
  matchData : any
  team1Score!:number
  team2Score!:number
  team1winner:boolean = false
  team2winner:boolean = false
  updateGoalScrorer : boolean = false
  nameInvalid : boolean = false

  getLogo(logo:string):string{
    return `${environment.User_API_Key}/files/${logo}`
  }

  decrement(team:string){
    team == 'team2'
    ? this.team2Score > 0
      ? (this.team2Score--)
      : null
    : this.team1Score > 0
    ? (this.team1Score--)
    : null;
     
  }

  increment(team:string,teamId:string){
    const dilaog = this._dialogue.open(PopupComponent,{
      width : '30%',
      height : '250px',
      data:{
        title: 'Update Goal scorer',
        teamId
      }
    })
    dilaog.afterClosed().subscribe((result) => {
      if (result && result.updatedData) {
        this.teamscore.push(result.updatedData)
        this._toastr.success('Score name updated successfully');
        team == 'team2'?this.team2Score++:this.team1Score++ 
      }
    });
  }



  winner(team:string){
    team == 'team1' ? (this.team1winner=true,this.team2winner=false) : (this.team2winner=true,this.team1winner=false)
  }

  updateTournament(matchId:string){
    let winner
   if(this.team1Score==this.team2Score){
    if(!this.team1winner && !this.team2winner){
      this._toastr.warning("please select one winner")
    }else{
      this.team1winner ? winner=this.matchData.team1Id._id : winner=this.matchData.team2Id._id
    }
    }else{
      this.team1Score>this.team2Score ? winner=this.matchData.team1Id._id : winner=this.matchData.team2Id._id
    }

   if(winner){
        const form = {
      team1score:this.team1Score,
      team2score:this.team2Score,
      tournamentId:this.tournamentId,
      matchId,
      winner
    }

    this._subscription.add(

      this._managerService.updateScore(form,this.teamscore).subscribe(
        (res) => {
          this._ref.close({ updatedData: form });
        },
        (err) => {
          if (err.error.message) {
            this._toastr.error(err.error.message);
          } else {
            this._toastr.error('internal server error');
          }
        }
      )
    )
  }
}

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }


  
  Savescore() {
    if (this.scoreForm.valid) {
      this.nameInvalid = false;
      let form = this.scoreForm.getRawValue();
      form.teamId=this.teamId
      this._ref.close({ updatedData: form});
    } else {
      this.nameInvalid = true;
    }
  }
  
}
