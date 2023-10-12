import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ManagerService } from 'src/app/service/manager.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  inputData: any;
  editdata: any;
  useredit: boolean = false;
  rejectTournament: boolean = false;
  tournamentName : string = ''
  tournamentId : string = ''

  formData = this.builder.group({
    name: this.builder.control(''),
    email: this.builder.control(''),
    reason: this.builder.control(''),
  });

  constructor(
    private ref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private managerService: ManagerService,
    private toastr: ToastrService,
    private userService: UserService,
    private adminService : AdminService
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
  }

  setManagerPopupdata() {

    this.managerService.managerDetails().subscribe((res) => {
      this.editdata = res;
      this.formData.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
        reason:''
      });
    });

  }

  setUserPopupdata() {

    this.userService.userDetails().subscribe((res) => {
      this.editdata = res;
      this.formData.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
        reason:''
      });
    });

  }

  Saveuser() {

    const form = this.formData.getRawValue();

    if(this.rejectTournament){
      var data = {
        reason : form.reason,
        id:this.tournamentId
      }
      this.adminService.rejectTournamnet(data).subscribe((res) => {
        this.ref.close({ updatedData: form });
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('internal server error');
        }
      })

    }
    else if (this.useredit) {
      this.userService.saveUser(form).subscribe(
        (res) => {
          this.ref.close({ updatedData: form });
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('internal server error');
          }
        }
      );

    } else {

      this.managerService.saveManager(form).subscribe(
        (res) => {
          this.ref.close({ updatedData: form });
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('internal server error');
          }
        }
      );

    }
  }
}
