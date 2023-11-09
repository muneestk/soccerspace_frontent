import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-registered-teams',
  templateUrl: './registered-teams.component.html',
  styleUrls: ['./registered-teams.component.css']
})
export class RegisteredTeamsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _managerService : ManagerService,
    private _toastr : ToastrService
  ){}

  tournamentId :any
  teams : any

  ngOnInit(): void {
    this.tournamentId = this._route.snapshot.paramMap.get('id')

    this._managerService.registeredTeams(this.tournamentId).subscribe(
      (res) => {
       this.teams = res
      },(err) => {
        this._toastr.error(err.error.message)
      }
    )


  }

  logoImage(logoImage:string):string{
    return `${environment.NEXT_PUBLIC_User_API_Key}/files/${logoImage}`
  }

}
