import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  invalid : boolean = false

  formData = this._builder.group({
    name: this._builder.control(''),
    email: this._builder.control(''),
    reason: this._builder.control('',[Validators.required,Validators.minLength(5)]),
  });

  constructor(
    private _ref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _builder: FormBuilder,
    private _managerService: ManagerService,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _adminService : AdminService
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

    this._managerService.managerDetails().subscribe((res) => {
      this.editdata = res;
      this.formData.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
        reason:''
      });
    });

  }

  setUserPopupdata() {

    this._userService.userDetails().subscribe((res) => {
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

      if(this.formData.valid){
         var data = {
          reason : form.reason,
          id:this.tournamentId
        }
        this._adminService.rejectTournamnet(data).subscribe((res) => {
          this._ref.close({ updatedData: form });
        },
        (err) => {
          if (err.error.message) {
            this._toastr.error(err.error.message);
          } else {
            this._toastr.error('internal server error');
          }
        })
      }else{
        this.invalid = true
    }

    }
    else if (this.useredit) {
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
      );

    } else {

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
      );

    }
  }
}
