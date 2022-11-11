import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Generic } from 'src/models/generic.model';
import { ConfigurationService } from 'src/services/configuration.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent implements OnInit {

  departmentlist: Generic;

  constructor(private configurationService: ConfigurationService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList() {
    this.spinnerService.show('picklistloader');
    this.configurationService.getPicklist(2).subscribe(res => {
      this.departmentlist = res;
      this.departmentlist[0].type = 'department';
      this.spinnerService.hide('picklistloader');
    })
  }

}
