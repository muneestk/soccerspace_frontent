import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup ,FormControl,Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { TrimValidator } from '../../customValidator/vallidations';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy{
  
  registerForm !: FormGroup ;
  invalid : boolean = false ;
  isLoggedin?: boolean;
  private _subscription : Subscription = new Subscription()

  constructor(
    private _router : Router,
    private _tostr : ToastrService,
    private _userService : UserService,
  ){} 

  ngOnInit(): void {

   this.registerForm = new FormGroup({

    name : new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z].*"),
      TrimValidator.trim()
    ]),

    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),

    password : new FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
    ])

   })
  
  }

  get name(): FormControl{
    return this.registerForm.get('name') as FormControl ;
  }

  get email(): FormControl{
    return this.registerForm.get('email') as FormControl
  }
  
  get password(): FormControl{
    return this.registerForm.get("password") as FormControl
  }



  

 

  registerSubmit(){
    const user = this.registerForm.getRawValue();

    if(!this.registerForm.valid){
      this.invalid=true;  
    }else{
      this._subscription.add(
        this._userService.userRegister(user)
        .subscribe((result) => {
          this._router.navigate(['/verify']);
          this._tostr.success("successfully registered,verify your email to continue login")
        },
        (err) => {
         if(err.error.message){
          this._tostr.error(err.error.message);
         }else{
          this._tostr.error("something went wrong");
         }
        }
        )
      )
      
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}


