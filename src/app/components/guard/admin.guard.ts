import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : 'root'
})

export class AdminGuardOut implements CanActivate{

  constructor(public _router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('adminSecret')
    if (token) {
      this._router.navigate(['/admin/dashboard'])
      return false
    }else {
      return true
    }
    }
  
  }

@Injectable({
  providedIn : 'root'
})

export class AdminGuardLog implements CanActivate {
  constructor(public _router : Router)
  {}

  canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : Observable<boolean> | boolean {
    
    const token = localStorage.getItem('adminSecret')
    if(!token){
      this._router.navigate(['/admin'])
      return false  
    }else {
      return true
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class AdminGuardcon implements CanActivate {

  constructor(private _router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const managerToken = localStorage.getItem('managarSecret')
    const userToken = localStorage.getItem('userSecret')

    if(managerToken){
      this._router.navigate(['/manager/home'])
      return false
    }else if(userToken){
      this._router.navigate(['/'])
      return false
    }else{
      return true
    }
  }
}
