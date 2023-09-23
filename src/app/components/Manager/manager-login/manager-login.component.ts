import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/service/manager.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css'],
})
export class ManagerLoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalid: boolean = false;

  constructor(
    private managerservice: ManagerService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),

      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password() : FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginSubmit() {
    const manager = this.loginForm.getRawValue();

    if (!this.loginForm.valid) {
      this.invalid = true;
    } else {
      this.managerservice.managerLogin(manager).subscribe(
        (res) => {
          localStorage.setItem('managerSecret', res.toString());
          this.router.navigate(['/manager/home']);
        },
        (err) => {
          if (err.error.message) {
            this.toaster.error(err.error.message);
          } else {
            this.toaster.error('something went wrong');
          }
        }
      );
    }
  }
}
