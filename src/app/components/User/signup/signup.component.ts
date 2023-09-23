import { Component, OnInit } from '@angular/core';
import {  FormGroup ,FormControl,Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  registerForm !: FormGroup ;
  invalid : boolean = false ;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(
    private router : Router,
    private tostr : ToastrService,
    private userService : UserService,
    private socialAuthService: SocialAuthService,
  ){} 

  ngOnInit(): void {

   this.registerForm = new FormGroup({

    name : new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z].*")
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

   

   this.socialAuthService.authState.subscribe((user) => {
    this.socialUser = user;
    this.isLoggedin = user != null;
    console.log(this.socialUser);

  });


  
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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  registerSubmit(){
    const user = this.registerForm.getRawValue();

    if(!this.registerForm.valid){
      this.invalid=true;  
    }else{
      this.userService.userRegister(user)
      .subscribe((result) => {
        this.router.navigate(['/verify']);
        this.tostr.success("successfully registered,verify your email to continue login")
      },
      (err) => {
       if(err.error.message){
        this.tostr.error(err.error.message);
       }else{
        this.tostr.error("something went wrong");
       }
      }
      )
      
    }
  }

}


