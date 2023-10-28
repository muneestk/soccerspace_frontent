import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  chartOptions = {
	  title: {
		  text: "Weekly Tournament registered Data"
	  },
    responsive: true,
    maintainAspectRatio: false,
	  theme: "light2",
	  animationEnabled: true,
	  exportEnabled: true,
	  axisY: {
		includeZero: true,
		valueFormatString: "₹#,##00"
	  },
	  data: [{
		type: "area", //change type to bar, line, area, pie, etc
		yValueFormatString: "₹#,##00",
		color: "#01b8aa",
		dataPoints: [
			
		]
	  }]
	}

	constructor(private _adminService:AdminService,private _toastr : ToastrService){}

	private subscription : Subscription = new Subscription();
	loadData : any[] = []

	ngOnInit(): void {
		this.getDashboard()
	}


	getDashboard(){
		this.subscription.add(

			this._adminService.loadDashboard().subscribe({
				next:(res) => {
					this.loadData = res
					console.log(res);
					this.chartOptions.data[0].dataPoints = res.map((item: any) => ({
						label: item.week, 
						y: item.totalFee,
					  }));
				},
				error:(err) => {
					if(err){
						this._toastr.error(err.error.message)
					}
				},
				complete:() => {
					console.log('compleeted');
				}
			})
		)
	}
  
	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}
