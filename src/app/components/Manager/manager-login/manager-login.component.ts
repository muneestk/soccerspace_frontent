import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/service/manager.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css'],
})
export class ManagerLoginComponent implements OnInit,OnDestroy {

  loginForm!: FormGroup;
  invalid: boolean = false;
  user !: SocialUser;
  private _Subscription:Subscription = new Subscription()

  constructor(
    private _managerservice: ManagerService,
    private _toastr: ToastrService,
    private _router: Router,
    private _socialAuthService : SocialAuthService,


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

    

    this._Subscription.add( 
    this._socialAuthService.authState.subscribe((user) => {
      console.log(user,'manager');
        this._managerservice.managerGoogleSignin(user).subscribe((res) =>{
          localStorage.setItem('managerSecret', res.toString());
          this._router.navigate(['/manager/home']);
        },(err) =>{
            if(err.error.message){
            this._toastr.error(err.error.message);
           }else{
            this._toastr.error("internal server error");
           }
        })
      }
      )
      
     ); 
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
      this._Subscription.add(

        this._managerservice.managerLogin(manager).subscribe(
          (res) => {
            localStorage.setItem('managerSecret', res.toString());
            this._router.navigate(['/manager/home']);
          },
          (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('something went wrong');
            }
          }
        )
      )
    }
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe()
  }
}
