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

export class AdminService {

  constructor(private http : HttpClient) { }

  apiUrl : string = environment.NEXT_PUBLIC_API_Key  ;

  adminLogin(form:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,form,httpOptions)
  }

  loadUsers():Observable<any>{
   return this.http.get(`${this.apiUrl}/usersList`,{
    withCredentials : true
   })
  }

  
  loadManagers():Observable<any>{
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

  loadTournaments():Observable<any>{
   return this.http.get(`${this.apiUrl}/tournamentsList`,{
    withCredentials : true
   })
  }

  ApproveAction(id : string):Observable<any>{
    const requestBody = { id: id };
   return this.http.patch(`${this.apiUrl}/approveTournament`,requestBody,httpOptions)
  }


  rejectTournamnet(data :any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/rejectTournament`,data,httpOptions)
  }

  loadDashboard():Observable<any>{
    return this.http.get(`${this.apiUrl}/loadDashBoard`,{
     withCredentials : true
    })
   }


}
