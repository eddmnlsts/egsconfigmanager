import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Generic } from 'src/models/generic.model';
import { ConfigurationService } from 'src/services/configuration.service';

@Component({
  selector: 'app-positionlist',
  templateUrl: './positionlist.component.html',
  styleUrls: ['./positionlist.component.css']
})
export class PositionlistComponent implements OnInit {

  positionlist: Generic;

  constructor(private configurationService: ConfigurationService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPositionList();
  }

  getPositionList() {
    this.spinnerService.show('picklistloader');
    this.configurationService.getPicklist(3).subscribe(res => {
      this.positionlist = res;
      this.positionlist[0].type = 'position';
      this.spinnerService.hide('picklistloader');
    })
  }

}
