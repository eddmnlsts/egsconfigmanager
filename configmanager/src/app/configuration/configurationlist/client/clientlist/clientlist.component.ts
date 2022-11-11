import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Generic } from 'src/models/generic.model';
import { ConfigurationService } from 'src/services/configuration.service';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  clientlist: Generic;

  constructor(private configurationService: ConfigurationService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getClientList();
  }

  getClientList() {
    this.spinnerService.show('picklistloader');
    this.configurationService.getPicklist(1).subscribe(res => {
      this.clientlist = res;
      this.clientlist[0].type = 'client';
      this.spinnerService.hide('picklistloader');
    })
  }
}
