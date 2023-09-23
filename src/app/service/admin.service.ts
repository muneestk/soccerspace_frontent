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

export class AdminService {

  constructor(private http : HttpClient) { }

  apiUrl : string = "http://localhost:3000/admin" ;

  adminLogin(form:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,form,httpOptions)
  }



}
