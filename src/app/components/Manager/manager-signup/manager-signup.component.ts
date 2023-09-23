import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-manager-signup',
  templateUrl: './manager-signup.component.html',
  styleUrls: ['./manager-signup.component.css']
})



export class ManagerSignupComponent implements OnInit {
  constructor(
    private managerService : ManagerService,
    private router : Router,
    private toastr : ToastrService
    )
  {}
  
  managerRegisterForm !:FormGroup ;
  invalid : boolean = false ;

  

   ngOnInit(): void {
     this.managerRegisterForm = new FormGroup({

      name : new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-z]*")
      ]),

      email : new FormControl("",[
        Validators.required,
        Validators.email,
      ]),

      password : new FormControl("",[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8)
      ])

    })
   }

   get name() : FormControl{
     return this.managerRegisterForm.get('name') as FormControl
   }

   get email() : FormControl{
    return this.managerRegisterForm.get('email') as FormControl
   }

   get password() : FormControl{
    return this.managerRegisterForm.get('password') as FormControl
   }

   registerSubmit(){
      const manager = this.managerRegisterForm.getRawValue()
      console.log(manager);

      if(!this.managerRegisterForm.valid){
       this.invalid = true
      }else{
        this.managerService.managerSignup(manager).
        subscribe((result) => {
               this.router.navigate(['/manager/manangerverify',(result as {_id:String})._id])
               this.toastr.success("successfully registered , verify your email")
        },
        (err) => {
          if(err.error.message){
            this.toastr.error(err.error.message)
          }else{
            this.toastr.error("something went wrong")
          }
        })
     }
  }


}
