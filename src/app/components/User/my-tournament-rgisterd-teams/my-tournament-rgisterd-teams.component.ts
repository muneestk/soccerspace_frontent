import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-my-tournament-rgisterd-teams',
  templateUrl: './my-tournament-rgisterd-teams.component.html',
  styleUrls: ['./my-tournament-rgisterd-teams.component.css']
})
export class MyTournamentRgisterdTeamsComponent implements OnInit,OnDestroy{

  constructor(
    private _userService : UserService,
    private _toastr : ToastrService,
    private _activateRoute : ActivatedRoute

  ){}

  private  subscribtion : Subscription = new Subscription()
  teamsData : any

  ngOnInit(): void {

    const id = this._activateRoute.snapshot.paramMap.get('id')


    this.subscribtion.add(
      this._userService.myTournamentsTeams(id).subscribe(
        (res) => {
          this.teamsData = res
          console.log(this.teamsData);
        },
        (err) => {
          this._toastr.error(err.error.message)
        }
      )
    )
    
  }

  getLogo(logo:string):string{
    return `${environment.User_API_Key}/files/${logo}`
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }



 
}
