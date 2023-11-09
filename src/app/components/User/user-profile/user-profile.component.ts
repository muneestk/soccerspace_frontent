import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  name !: string ;
  email !: string ;



  constructor(
    private userService : UserService,
    private toastr : ToastrService,
    private matDialog : MatDialog

    ){}

   ngOnInit(): void {

     this.userService.userDetails().subscribe(
       (res) => {
         this.name = res.name;
         this.email = res.email;
       },
       (err) => {
         if (err.error.message) {
           this.toastr.error(err.error.message);
         } else {
           this.toastr.error('something went wrong');
         }
       }
     );

    


   }

  editProfile():void{
    const dialogRef = this.matDialog.open(PopupComponent,{
      width : '40%',
      height : '350px',
      data:{
        title: 'User Edit'
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
