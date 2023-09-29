import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.staging';

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
  // apiUrl : string = environment.API_Key ;

  adminLogin(form:any):Observable<any>{
    console.log('login');
    return this.http.post(`${this.apiUrl}/login`,form,httpOptions)
  }

  loadUsers():Observable<any>{
   return this.http.get(`${this.apiUrl}/usersList`,{
    withCredentials : true
   })
  }

  
  loadManagers():Observable<any>{
    console.log('enntered')
   return this.http.get(`${this.apiUrl}/managerList`,{
    withCredentials : true
   })
  }

  unBlockUser(id:string) :Observable<any>{
    const requestBody = { id: id };
    return this.http.patch(`${this.apiUrl}/unBlockUser`,requestBody,httpOptions)
  }

  blockUser(id:string) :Observable<any>{
    const requestBody = { id: id };
    return this.http.patch(`${this.apiUrl}/blockUser`,requestBody,httpOptions)
  }

  unBlockManager(id:string) :Observable<any>{
    const requestBody = { id: id };
    return this.http.patch(`${this.apiUrl}/unBlockManager`,requestBody,httpOptions)
  }

  blockManager(id:string) :Observable<any>{
    const requestBody = { id: id };
    return this.http.patch(`${this.apiUrl}/blockManager`,requestBody,httpOptions)
  }



}
