import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  loginForm !: FormGroup
  invalid : boolean = false


  constructor(
    private adminService : AdminService,
    private router : Router,
    private toastr : ToastrService
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
    console.log(form);
    
    if(!this.loginForm.valid){
      this.invalid = true;
    }else{
      this.adminService.adminLogin(form)
      .subscribe((res) =>{
           localStorage.setItem('adminSecret',res.toString())
           this.router.navigate(['/admin/dashboard'])
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
