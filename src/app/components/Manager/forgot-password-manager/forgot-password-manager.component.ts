import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-forgot-password-manager',
  templateUrl: './forgot-password-manager.component.html',
  styleUrls: ['./forgot-password-manager.component.css']
})
export class ForgotPasswordManagerComponent implements OnInit,OnDestroy {

  constructor(
    private _mangerService : ManagerService,
    private _toastr : ToastrService,
    private _route : ActivatedRoute,
    private _router : Router
   ){}

   private subscription:Subscription = new Subscription()
 
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
    this.subscription.add(
     this._mangerService.forgotPasswordSendMail(user).subscribe(
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
 
   passwordSubmit(): void {
    const form = this.passwordSubmitForm.getRawValue();
    if (!this.passwordSubmitForm.valid) {
      this.samePassword = false;
      this._toastr.error('Password fields are required and must have at least 5 characters');
    } else if (form.password !== form.confirmPassword) {
      this.samePassword = true;
    } else {
      this.subscription.add(
      this._mangerService.forgotPassword({ ...form, id: this.id, token: this.token }).subscribe(
        (res) => {
          this._router.navigate(['/login']);
          this._toastr.success(res.message);
        },
        (err) => {
          this._toastr.error(err.error.message);
        }
      )
      )
      
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
