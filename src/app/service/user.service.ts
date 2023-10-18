import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    ) { }

    apiUrl : string = environment.User_API_Key  ;

    userRegister(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/register`,user,httpOptions)
    }

    userGoogleSignin(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/googleLogin`,user,httpOptions)
    }

    userLogin(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/login`,user,httpOptions)
    }

    verifyUser(id:any,token:any) : Observable<any>{
      var data ={
        id:id,
        token:token
      }
      return this.http.post(`${this.apiUrl}/verifyUser`,data,httpOptions)
    }
    
    userDetails() : Observable<any>{
      return this.http.get(`${this.apiUrl}/userDetails`,{
        withCredentials : true
      })
    }

    saveUser(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/userSave`,user,httpOptions)
    }

    registerTournament(form:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/registerTournament`,form)
    }

    verifypayment(form:any,id:any,teamId:any) : Observable<any>{
      var data = {
        response : form,
        trnmntId : id,
        teamId
      }
      return this.http.post(`${this.apiUrl}/verifyPayment`,data)
    }

    forgotPasswordSendMail(form:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/forgotMailSent`,form)
    }

    forgotPassword(form:any) : Observable<any>{
      return this.http.patch(`${this.apiUrl}/forgotPassword`,form)
    }

    reVerify(form:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/reVerifyAccount`,form)
    }

    myTournaments() : Observable<any>{
      return this.http.get(`${this.apiUrl}/myTournaments`)
    }


}
