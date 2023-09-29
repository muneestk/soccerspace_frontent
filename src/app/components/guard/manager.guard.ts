import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : 'root'
})

export class ManagerGuardOut implements CanActivate {

  constructor(public router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('managerSecret')
    if (token) {
      this.router.navigate(['/manager/home'])
      return false
    }else {
      return true
    }  }
  
}

@Injectable({
  providedIn : 'root'
})

export class ManagerGuardLog {
  constructor(public router : Router)
  {}

  canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : boolean {
    
    const token = localStorage.getItem('managerSecret')
    if(!token){
      this.router.navigate(['/manager'])
      return false
    }else {
      return true
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class ManagerGuardcon implements CanActivate {

  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const adminToken = localStorage.getItem('adminSecret')
    const userToken = localStorage.getItem('userSecret')

    if(adminToken){
      this.router.navigate(['/admin'])
      return false
    }else if(userToken){
      this.router.navigate(['/'])
      return false
    }else{
      return true
    }
  }
}
