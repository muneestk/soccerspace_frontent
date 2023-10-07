import { Component,Input,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-verify-manager',
  templateUrl: './verify-manager.component.html',
  styleUrls: ['./verify-manager.component.css']
})
export class VerifyManagerComponent implements OnInit{

  invalid: boolean = false;
  verificationForm !: FormGroup;
  showResend : boolean = false;
  counterSec : number = 10

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private managerservice: ManagerService
      ){}
  
  ngOnInit(): void {
    this.verificationForm = new FormGroup({
      verification: new FormControl("",[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])
    })

    this.timeout()
  }

  
  get verification(): FormControl{
    return this.verificationForm.get("verification") as FormControl
  }

  verificationSubmit(){

    const otp = this.verificationForm.getRawValue();
    let id = this.route.snapshot.paramMap.get('id')

    if(!this.verificationForm.valid){
      this.invalid = true;
    }else{
      this.managerservice.userVerification(id,otp)
      .subscribe((res)=>{
        this.toastr.success("Your Email successfully verified")
        localStorage.setItem('managerSecret', res.toString());
          this.router.navigate(['/manager/home']);
      }
      ,(err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message);
        }else{
          this.toastr.error("Something went wrong")
        }
      }
      )
    }
  }

  resendOtp():void{
    let id = this.route.snapshot.paramMap.get('id')
    this.managerservice.reSendOtp(id).
    subscribe((res) => {
      this.toastr.success("please check your resend otp")
      this.counterSec+=10
      this.timeout()
    },(err) =>{
      this.showResend = true
      if(err.error.message){
        this.toastr.error(err.error.message);
      }else{
        this.toastr.error("Something went wrong")
      }
    })
  }


  timeout(): void {
    const interval = setInterval(() => {
      this.showResend = false
      if (this.counterSec > 1) {
        this.counterSec--;
      } else {
        this.showResend = true
        clearInterval(interval); 
      }
    }, 1000);
  }


  }


