import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})


export class ManagerProfileComponent implements OnInit {

  constructor(
    private managerService : ManagerService,
    private toastr : ToastrService,
    private matDialog : MatDialog

    ){}

  name !: string ;
  email !: string ;

  ngOnInit(): void {
    this.managerService.managerDetails().
    subscribe((res) => {
       this.name = res.name
       this.email = res.email
    },(err) => {
      console.log(err);
    })
  }



  editProfile():void{

    const dialogRef = this.matDialog.open(PopupComponent,{
      width : '400px',
      height : '350px',
      data:{
        title: 'Manager Edit'
      }

    })


    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.updatedData) {
        this.name = result.updatedData.name;
        this.email = result.updatedData.email;
        this.toastr.success('Profile updated successfully');
      }
    });
  
  }


 
  

}
