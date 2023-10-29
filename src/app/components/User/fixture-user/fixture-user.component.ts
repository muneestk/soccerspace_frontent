import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/service/manager.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-fixture-user',
  templateUrl: './fixture-user.component.html',
  styleUrls: ['./fixture-user.component.css']
})
export class FixtureUserComponent implements OnInit,OnDestroy{

  constructor(
    private _managerService : ManagerService,
    private _activateRoute : ActivatedRoute
  ){}

  private _subscription : Subscription =  new Subscription()


  fixture !: any
  userId !:string


  ngOnInit(): void {
    let id = this._activateRoute.snapshot.paramMap.get('id')
    if(id){
      this.getFixture(id)
    }
    
    let token:any = localStorage.getItem('userSecret')
    if(token){
      const decoded:any = jwtDecode(token)
      this.userId = decoded._id
    }
    
  }

  getFixture(id:string){
    this._subscription.add(
      this._managerService.getFixture(id).subscribe({
        next:(res) => {
          this.fixture = res.fixtureData
          console.log(this.fixture,"fixture");
        }
      })
    )
  }

  getLogo(logo:string):string{
    return `${environment.User_API_Key}/files/${logo}`
  }

  ngOnDestroy(): void {
    
  }
}
