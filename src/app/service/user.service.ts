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
export class UserService {

  constructor(
    private http:HttpClient,
    ) { }

    apiUrl : string = "http://localhost:3000";

    userRegister(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/register`,user,httpOptions)
    }

    userLogin(user:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/login`,user,httpOptions)
    }

    verifyUser(id:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/verifyUser?id=`+id,httpOptions)

    }


}
