import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})


export class ManagerProfileComponent implements OnInit {

  constructor(private managerService : ManagerService,private toastr : ToastrService){}

  name !: string ;
  email !: string ;

  ngOnInit(): void {
    this.managerService.managerDetails().
    subscribe((res) => {
       this.name = res.name
       this.email = res.email
       console.log(res);
    },(err) => {
      console.log(err);
    })
  }

}
