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

export class ManagerService {

  constructor(private http : HttpClient) { }

  apiUrl:string = environment.Manager_API_Key ;

  managerSignup(manager:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,manager,httpOptions)
  }

  managerLogin(manager:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,manager,httpOptions)
  }

  userVerification(id:any,otp:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/verification?id=`+id,otp,httpOptions)
  }

  reSendOtp(id:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/resendOtp?id=`+id,httpOptions)
  }

  managerDetails():Observable<any>{
    return this.http.get(`${this.apiUrl}/managerDetails`,{
      withCredentials : true
    })
  }

  saveManager(form:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/saveManager`,form,httpOptions)
  }

  addTournament(user:any):Observable<any>{
    console.log(user,'klll');
    return this.http.post(`${this.apiUrl}/addTournment`,user)
  }
  
  

}
