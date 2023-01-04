import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AlertService } from 'src/services/alert.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  users2;
  p: number = 1;

  private userChangeSub: Subscription;

  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();

    this.userService.getUserList().subscribe((res) => {
      console.log(res);
      this.users = res;
      this.users2 = res;
      this.spinnerService.hide();
    });

    this.userChangeSub = this.userService.changedUsers
    .subscribe((users : User[]) => {
      this.users = users;
    })
  }

 

  onUpdatePermission(selSourceNum, selIsAdmin, event) {
    this.alertService.alertConfirm('question', 'Update Permission?', 'Are you sure you want to update this users permission?')
    .then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUserPermission(selSourceNum, selIsAdmin = !selIsAdmin).subscribe((res) => {
          console.log(res);
        })
      } else {
        event.target.checked = selIsAdmin;
      }
    });

  }
}
