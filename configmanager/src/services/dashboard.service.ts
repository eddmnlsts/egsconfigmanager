import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root'
  })
export class DashboardService {
  constructor(
    private appService: AppService,
    private spinnerService: NgxSpinnerService
  ) {}

  getClientCountChart() {
    return this.appService.getClientCountChart();
  }
}
