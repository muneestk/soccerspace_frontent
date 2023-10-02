import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserGuardLog implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret');
    if (token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class UserGuardOut implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class UserGuardcon implements CanActivate {

  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const adminToken = localStorage.getItem('adminSecret')
    const managerToken = localStorage.getItem('managerSecret')

    if(adminToken){
      this.router.navigate(['/admin'])
      return false
    }else if(managerToken){
      this.router.navigate(['/manager'])
      return false
    }else{
      return true
    }
  }
}
