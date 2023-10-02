import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let userToken = localStorage.getItem("userSecret")
    let managerToken = localStorage.getItem("managerSecret")
    let adminToken = localStorage.getItem("adminSecret")

    if(userToken){
      const newRequest = request.clone({
        headers: request.headers.set('Authorization','Bearer '+userToken)
      })
      console.log(newRequest);
      return next.handle(newRequest);
    }
    if(managerToken){
      const newRequest = request.clone({
        headers : request.headers.set('Authorization','Bearer '+managerToken)
      })
      return next.handle(newRequest)
    }

    if(adminToken){
      const newRequest = request.clone({
        headers : request.headers.set('Authorisation' , 'Bearer ' + adminToken)
      })
      console.log(newRequest);
      return next.handle(newRequest)
    }
    return next.handle(request);
  }
  
}
