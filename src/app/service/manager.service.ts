import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json',
  })
}

@Injectable()

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
    return this.http.post(`${this.apiUrl}/addTournment`,user)
  }

  forgotPasswordSendMail(form:any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/forgotMailSent`,form)
  }

  forgotPassword(form:any) : Observable<any>{
    return this.http.patch(`${this.apiUrl}/forgotPassword`,form)
  }
  

  registeredTeams(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/registeredTeams?id=${id}`);
  }

  getFixture(id: string ): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFixture?id=${id}`);
  }
  
  updateScore(form:any,team:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/updateScore`,{form,team},httpOptions)
  }

  updateRound(form:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/updateRound`,form,httpOptions)
  } 

  managerGoogleSignin(user:any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/googleLogin`,user,httpOptions)
  }


  getGoalScorers(id:string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/getGoalScorers/${id}`)
  }


  getChatLIst() : Observable<any>{
    return this.http.get(`${this.apiUrl}/getChatLIst`)
  }

  getFullChat(id:string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/getFullChat?id=${id}`)
  }

  sentmessage(form:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/sentMessage`,form)
  }
}
