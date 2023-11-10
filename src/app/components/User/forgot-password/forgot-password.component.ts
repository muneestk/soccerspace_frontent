import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy{

  constructor(
   private _userService : UserService,
   private _toastr : ToastrService,
   private _route : ActivatedRoute,
   private _router : Router
  ){}

  private _subscription:Subscription = new Subscription()

  sendMailForm !: FormGroup ;
  passwordSubmitForm !: FormGroup ;
  invalid : boolean = false ;
  invalid2 : boolean = false ;
  id !: any
  token !: any
  resubmitPassword : boolean = false
  samePassword : boolean = false

  ngOnInit(): void {
    this.sendMailForm = new FormGroup({
      email : new FormControl("",[Validators.required,Validators.email])
    })

    this.passwordSubmitForm = new FormGroup({
      password : new FormControl("",[Validators.required,Validators.minLength(5)]),
      confirmPassword : new FormControl("",[Validators.required,Validators.minLength(5)])
    })

    this.id = this._route.snapshot.paramMap.get('id')
    this.token = this._route.snapshot.paramMap.get('token')
    if(this.id){
      this.resubmitPassword = true
    }
  }

  get email() : FormControl{
    return this.sendMailForm.get('email') as FormControl
  }

  get password() : FormControl{
    return this.passwordSubmitForm.get('password') as FormControl
  }

  get confirmPassword() : FormControl{
    return this.passwordSubmitForm.get('confirmPassword') as FormControl
  }

  forgotSubmit():void{
    const user = this.sendMailForm.getRawValue()
    this._subscription.add(
      this._userService.forgotPasswordSendMail(user).subscribe(
        (res) =>{
          this._toastr.warning("Check your email for verification")
          this.ngOnInit()
        },
        (err) => {
          this._toastr.error("something went wrong")
        }
      )
    )
  }

  passwordSubmit():void{
    if(!this.passwordSubmitForm.valid){
      this.invalid2 = true
    }else{
      const form = this.passwordSubmitForm.getRawValue()
      if(form.password != form.confirmPassword){
        this.samePassword = true
      }else{
        this.samePassword = false
        form.id = this.id
        form.token = this.token
        this._subscription.add(
          this._userService.forgotPassword(form).subscribe(
            (res) => {
              this._router.navigate(['/login'])
              this._toastr.success(res.message)
            },
            (err) => {
              this._toastr.error(err.error.message)
            }
          )        
        )

      }
    }
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
