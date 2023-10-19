import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { TournamentList } from '../../state/app.state';
import { Observable, map } from 'rxjs';
import { Tournaments } from '../../modal/model';
import { retrieveTournaments } from '../../state/app.action';
import { TournamentsData } from '../../state/app.selecter';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
declare var Razorpay: any;


@Component({
  selector: 'app-register-tournament',
  templateUrl: './register-tournament.component.html',
  styleUrls: ['./register-tournament.component.css']
})
export class RegisterTournamentComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<TournamentList>,
    private _route: ActivatedRoute,
    private _userService : UserService,
    private _toastr : ToastrService,
    private _router : Router
  ) {}

  tournamentDetail$!: Observable<Tournaments | undefined>;
  id!: any;
  logoSelectedFile!: File;
  logoImages!: any;
  invalid: boolean = false;
  invalid2 : boolean = false;
  invalidLogo : boolean = false;
  invalidLogo2 : boolean = false;
  TeamRegister !: FormGroup
  secondTeamRegister !: FormGroup
  

  ngOnInit(): void {
    this._store.dispatch(retrieveTournaments());
    this.id = this._route.snapshot.paramMap.get('id');

    this.tournamentDetail$ = this._store.pipe(
      select(TournamentsData),
      map(tournaments => tournaments.find(t => t._id === this.id))
    );

    
  this.TeamRegister = this._formBuilder.group({
    teamName: ['', [Validators.required]],
    managerName: ['', [Validators.required]],
    location: ['', [Validators.required]]
  });

  this.secondTeamRegister = this._formBuilder.group({
    mobno: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
    mobno2: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
  });
  }

 

  uploadImage(files: any) {
    this.logoSelectedFile = files.files[0];
    this.logoImages = URL.createObjectURL(this.logoSelectedFile);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; 

    if (!allowedTypes.includes(this.logoSelectedFile.type)) {
      this.invalidLogo2 = true
      this.logoImages=''
    }

  }

  getLogoUrl(logoimage: string): string {
    return `${environment.User_API_Key}/files/${logoimage}`;
  }

  getPosterImage(posterImage: string): string {
    return `${environment.User_API_Key}/files/${posterImage}`;
  }

  register() {
    if (this.TeamRegister.valid) {
      this.invalid = true;
    }
  }

  register2() {

    if(!this.logoImages){
      this.invalidLogo = true
    }else if (this.secondTeamRegister.valid) {
      this.invalid2 = true;
    }
  }

  submit(regFee:number){

    if(this.invalidLogo2){
      this._toastr.error(' Team logo must be image as png,jpeg or webp')
    }else{

    const form = this.TeamRegister.getRawValue()
    const form2 = this.secondTeamRegister.getRawValue()
    this.invalidLogo = false
    const formdata = new FormData()

    formdata.append("teamName",form.teamName)
    formdata.append("managerName",form.managerName)
    formdata.append("location",form.location)
    formdata.append("phno",form2.mobno)
    formdata.append("phno2",form2.mobno2)
    formdata.append("tournamentId",this.id)
    formdata.append("logoImage",this.logoSelectedFile,this.logoSelectedFile.name)

    const fee = regFee * 100
    
    this._userService.registerTournament(formdata).subscribe(
      (res) => {
        this._toastr.warning("verify your payment")
        const RazorpayOptions = {
          description: 'Sample Razorpay demo',
          currency: 'INR',
          amount: fee,
          name: 'Soccer Space',
          key: 'rzp_test_vHIaDnAR7StDlQ',
          handler: (response:any)=>{
            this.verifypayment(response,res._id)
          },
          image:'https://st3.depositphotos.com/13194036/37187/i/450/depositphotos_371873384-stock-photo-legs-professional-soccer-player-blue.jpg',
          prefill: {
            name: 'Soccer Space',
            email: 'muneestk5017@gmail.com',
            phone: '6282798759'
          },
          theme: {
            color: '#000000'
          },
          modal:{
            ondismiss:()=>{
              console.log('dismissed');
            }
          }
        }
        const successCallback = (paymentid: any)=>{
          console.log(paymentid);
        }

        const failureCallback = (e:any)=>{
          console.log(e);
        }

        Razorpay.open(RazorpayOptions,successCallback,failureCallback)
      },(err) => {
        this._toastr.error(err.error.message)
      }
    )

    }
  }

  verifypayment(response: any,teamId:any) {
    this._userService.verifypayment(response,this.id,teamId)
    .subscribe((res)=>{
      this._toastr.success("Payment success");
      this._router.navigate(['/myTournaments']);
    },(err)=>{
      this._toastr.error(err.error.message)
    })
  }

  
}
