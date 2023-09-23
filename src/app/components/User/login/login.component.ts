import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  invalid: boolean = false;
  id: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.verifyUser();
    }
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginSubmit() {
    const user = this.loginForm.getRawValue();
    console.log(user);
    if (!this.loginForm.valid) {
      this.invalid = true;
    } else {
      this.userService.userLogin(user).subscribe(
        (res) => {
          localStorage.setItem('userSecret', res.toString());
          this.router.navigate(['/']);
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('Something went wrong');
          }
        }
      );
    }
  }

  //verifying the user
  verifyUser() {
    this.userService.verifyUser(this.id).subscribe(
      (result) => {
        localStorage.setItem('userSecret', result.toString());
        this.router.navigate(['/']);
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
