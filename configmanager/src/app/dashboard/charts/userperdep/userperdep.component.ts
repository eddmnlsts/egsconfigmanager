import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-userperdep',
  templateUrl: './userperdep.component.html',
  styleUrls: ['./userperdep.component.css']
})
export class UserperdepComponent implements OnInit {

  dataArry: any[] = [];
  labelArry: any[] = [];
  pieChartLabels: any[] = [];
  pieChartDatasets: any[] = [];
  data: any[] = [];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardService : DashboardService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    
    this.spinnerService.show();
    this.dashboardService.getUsersPerDepartmentChart().subscribe(res => {
      for (var i = 0; i <= res.length - 1; i++) {
        this.pieChartLabels.push(res[i].name);
        this.data.push(res[i].y);
      }
      this.pieChartDatasets = [{
        'data': this.data
      }];
      this.spinnerService.hide();
    })
  }

}
