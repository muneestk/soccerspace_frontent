import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit,OnDestroy{

  loginForm !: FormGroup
  invalid : boolean = false
  private _subscription : Subscription = new Subscription()


  constructor(
    private _adminService : AdminService,
    private _router : Router,
    private _toastr : ToastrService
    ){}



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl("",[
        Validators.required,
        Validators.email
      ]),

      password : new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)
      ])
    })

  }

  get email() : FormControl{
    return this.loginForm.get('email') as FormControl
  }

  get password() : FormControl{
    return this.loginForm.get('password') as FormControl
  }


  loginSubmit(){
    const form = this.loginForm.getRawValue();
   
    if(!this.loginForm.valid){
      this.invalid = true;
    }else{
      this._subscription.add(
         this._adminService.adminLogin(form)
            .subscribe((res) =>{
                localStorage.setItem('adminSecret',res.toString())
                this._router.navigate(['/admin/dashboard/charts'])
            },
            (err) => {
              if(err.error.message){
                this._toastr.error(err.error.message)
              }else{
                this._toastr.error("something went wrong")
              }
            })
        
      )

    }

  }

ngOnDestroy(): void {
  this._subscription.unsubscribe()
}
  

}
