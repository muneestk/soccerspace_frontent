import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/service/manager.service';


@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {
  
  logoSelectedFile!: File;
  posterSelectedFile!: File;
  logoImages!: any;
  posterImages!: any;
  TornamentDetails!: FormGroup;
  invalid: boolean = false;

  constructor(
    private _managerService: ManagerService,
    private _toastr: ToastrService,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this.TornamentDetails = new FormGroup({
      tournamentname: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      TeamName: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      registerFee: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]*")
      ]),
      mobileNo: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      winnersPriceMoney: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]*")
      ]),
      runnersPriceMoney: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]*")
      ]), 
       slots: new FormControl("8", [Validators.required]),
      limit: new FormControl("open", [Validators.required]),
      players: new FormControl("Levens", [Validators.required]),
      tournamentDate: new FormControl("", [
        Validators.required,
        this.validateDate(5, 30)
      ]),
      
    });



  }

  get tournamentname(): FormControl {
    return this.TornamentDetails.get("tournamentname") as FormControl
  }

  get TeamName(): FormControl {
    return this.TornamentDetails.get("TeamName") as FormControl
  }

  get location(): FormControl {
    return this.TornamentDetails.get("location") as FormControl
  }

  get registerFee(): FormControl {
    return this.TornamentDetails.get("registerFee") as FormControl
  }

  get mobileNo(): FormControl {
    return this.TornamentDetails.get("mobileNo") as FormControl
  }


  get winnersPriceMoney(): FormControl {
    return this.TornamentDetails.get("runnersPriceMoney") as FormControl
  }



  get runnersPriceMoney(): FormControl {
    return this.TornamentDetails.get("winnersPriceMoney") as FormControl
  }


  
  get tournamentDate(): FormControl {
    return this.TornamentDetails.get("tournamentDate") as FormControl
  }

  validateDate(minDays: number, maxDays: number) {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const minDate = new Date();
      minDate.setDate(currentDate.getDate() + minDays);
      const maxDate = new Date();
      maxDate.setDate(currentDate.getDate() + maxDays);
  
      if (selectedDate >= minDate && selectedDate <= maxDate) {
        return null;
      } else {
        return { invalidDate: true };
      }
    };
  }
  


  uploadImage(files: any) {
    this.logoSelectedFile = <File>files.files[0];
    this.logoImages = URL.createObjectURL(this.logoSelectedFile);
  }
  
  uploadImage2(files: any) {
    this.posterSelectedFile = <File>files.files[0];
    this.posterImages = URL.createObjectURL(this.posterSelectedFile);
  }



 tournamentSubmit() {
  if (!this.TornamentDetails.valid) {
    this.invalid = true;
  }else{
    const formdetails = this.TornamentDetails.getRawValue();
    const formdata = new FormData();
    formdata.append('logoImage', this.logoSelectedFile, this.logoSelectedFile.name);
    formdata.append('posterImage', this.posterSelectedFile, this.posterSelectedFile.name);

      formdata.append('tournamentName',formdetails.tournamentname)
      formdata.append('TeamName',formdetails.TeamName)
      formdata.append('location',formdetails.location)
      formdata.append('mobileNo',formdetails.mobileNo)
      formdata.append('winnersPriceMoney',formdetails.winnersPriceMoney)
      formdata.append('runnersPriceMoney',formdetails.runnersPriceMoney)
      formdata.append('tournamentDate',formdetails.tournamentDate)
      formdata.append('slots',formdetails.slots)
      formdata.append('limit',formdetails.limit)
      formdata.append('players',formdetails.players)
      formdata.append('registerFee',formdetails.registerFee)


    this._managerService.addTournament(formdata).subscribe(
      (res) => {
        this._router.navigate(['/manager/tournamentList'])
        this._toastr.success(res.message);
      },
      (err) => {
        if (err.error.message) {
          this._toastr.error(err.error.message);
        } else {
          this._toastr.error('something went wrong');
        }
      }
    );

  }
  
}

  



}
