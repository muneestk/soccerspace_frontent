import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(
   private _userService : UserService,
   private _toastr : ToastrModule
  ){}

  sendMailForm !: FormGroup ;
  invalid : boolean = false

  ngOnInit(): void {
    this.sendMailForm = new FormGroup({
      email : new FormControl("",[Validators.required,Validators.email])
    })
  }

  get email() : FormControl{
    return this.sendMailForm.get('email') as FormControl
  }

  forgotSubmit():void{
    const user = this.sendMailForm.getRawValue()

    this._userService
  }

}
