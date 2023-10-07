import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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

  formData = this.builder.group({
    name: this.builder.control(''),
    email: this.builder.control(''),
  });

  constructor(
    private ref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private managerService: ManagerService,
    private toastr: ToastrService,
    private userService: UserService
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
  }

  setManagerPopupdata() {

    this.managerService.managerDetails().subscribe((res) => {
      this.editdata = res;
      this.formData.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
      });
    });

  }

  setUserPopupdata() {

    this.userService.userDetails().subscribe((res) => {
      this.editdata = res;
      this.formData.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
      });
    });

  }

  Saveuser() {

    const form = this.formData.getRawValue();

    if (this.useredit) {
      alert('hi')
      this.userService.saveUser(form).subscribe(
        (res) => {
          this.ref.close({ updatedData: form });
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('something went wrong');
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
            this.toastr.error('something went wrong');
          }
        }
      );

    }
  }
}
