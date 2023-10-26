import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/service/manager.service';
import { environment } from 'src/environments/environment.development';


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

  ) {}

  private subscription : Subscription = new Subscription()
  firstRound:any

  ngOnInit(): void {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    const slots:any = this._activeRouter.snapshot.paramMap.get('slot');
    const round  = parseInt(slots, 10);
    if (id) {
      this.loadTournament(id,Math.log2(round));
    }
  }

  loadTournament(id: string,round:number): void {
  this.subscription.add(
    this._managerService.getFixture(id,round).subscribe(
     (res) => {
       this.firstRound = res.fixtureData
       console.log(this.firstRound);
     }
    )
  )
  }

  getLogo(logo:string):string{
    return `${environment.User_API_Key}/files/${logo}`
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
