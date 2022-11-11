import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserHistory } from 'src/models/userhistory.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-activityhistory',
  templateUrl: './activityhistory.component.html',
  styleUrls: ['./activityhistory.component.css']
})
export class ActivityhistoryComponent implements OnInit {

  @Input() loggedUser;
  sourceNum = 0;
  userHistory: UserHistory;
  count = 0;
  

  constructor(private userService: UserService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getConfigHistory();
  }

  getConfigHistory() {
    this.spinnerService.show();
    this.userService.getUserConfigHistory(this.loggedUser.sourceNum).subscribe(res => {
      this.userHistory = res;
      this.count = res.length;
      this.spinnerService.hide();
    })
  }

}
