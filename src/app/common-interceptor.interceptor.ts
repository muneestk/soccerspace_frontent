import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonInterceptorInterceptor implements HttpInterceptor {

  constructor(private _router:Router,private _toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let userToken = localStorage.getItem("userSecret")
    let managerToken = localStorage.getItem("managerSecret")
    let adminToken = localStorage.getItem("adminSecret")

    if (userToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken)
      });
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this._toastr.error('You are blocked');
            localStorage.removeItem("userSecret");
            this._router.navigate(['/']);
          }else if (error.status === 401){
            this._toastr.error('please login again');
          }
          this._router.navigate(['/']);
          return throwError(error);
        })
      );
    
    }

    if (managerToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + managerToken)
      });

      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this._toastr.error('You are blocked');
            localStorage.removeItem("managerSecret");
          }else if (error.status === 401){
            this._toastr.error('please login again');
          }
          this._router.navigate(['/manager']);
          return throwError(error);
        })
      );
    }

    if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + adminToken)
      });

      return next.handle(newRequest)
    }

    return next.handle(request);
  }
}
