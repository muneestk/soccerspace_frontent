import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebarnav',
  templateUrl: './admin-sidebarnav.component.html',
  styleUrls: ['./admin-sidebarnav.component.css']
})
export class AdminSidebarnavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    logout():void{
      localStorage.removeItem('adminSecret')
      this.router.navigate(['/admin'])
    }
    
}
