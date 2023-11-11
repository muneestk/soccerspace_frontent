import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  data: any;
  private _subscription:Subscription = new Subscription()
  options: any;

  constructor(private _adminService:AdminService){}

  ngOnInit() {
    this._subscription.add(
      this._adminService.loadDashboard().subscribe({
        next: (res) => {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
  
          const colors = [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--purple-500')
          ];
  
          this.data = {
            labels: res.map((item: { _id: any }) => item._id),
            datasets: [
              {
                data: res.map((item: { count: any }, index: number) => item.count),
                backgroundColor: colors,
                hoverBackgroundColor: colors.map(color => `${color}80`), 
              }
            ]
          };
  
          this.options = {
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                  color: textColor
                }
              }
            }
          };
        }
      })
    );
  }
  

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}