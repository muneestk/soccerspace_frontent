import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  apiUrl:string = "http://localhost:3000/manager" ;

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
  
  

}
