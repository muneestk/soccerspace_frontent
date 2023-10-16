import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  invalid: boolean = false;
  id: any;
  user !: SocialUser;
  loggedIn : any ;


  constructor(
    private _userService: UserService,
    private _tostr: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _socialAuthService : SocialAuthService,
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

    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this.verifyUser();
    }

    this._socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if(!this.user){
        this._userService.userGoogleSignin(user).subscribe((res) =>{
          localStorage.setItem('userSecret', res.toString());
          this._router.navigate(['/']);
        },(err) =>{
            if(err.error.message){
            this._tostr.error(err.error.message);
           }else{
            this._tostr.error("internal server error");
           }
        })
      }
     
    });
    
  }


  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginSubmit() {
    const user = this.loginForm.getRawValue();
    if (!this.loginForm.valid) {
      this.invalid = true;
    } else {
      this._userService.userLogin(user).subscribe(
        (res) => {
          localStorage.setItem('userSecret', res.toString());
          this._router.navigate(['/']);
        },
        (err) => {
          if (err.error.message) {
            this._tostr.error(err.error.message);
          } else {
            this._tostr.error('Something went wrong');
          }
        }
      );
    }
  }

  //verifying the user
  verifyUser() {
    this._userService.verifyUser(this.id).subscribe(
      (result) => {
        localStorage.setItem('userSecret', result.toString());
        this._router.navigate(['/']);
      },
      (err) => {
        if (err.error.message) {
          this._tostr.error(err.error.message);
        } else {
          this._tostr.error('something went wrong');
        }
      }
    );
  }

  
}
