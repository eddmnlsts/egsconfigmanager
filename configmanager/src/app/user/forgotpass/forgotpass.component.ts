import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent implements OnInit {
  forgotPassForm: FormGroup;
  confirmedCreds = false;
  sourceNum = 0;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let username = '';
    let password = '';
    let email = '';

    this.forgotPassForm = new FormGroup({
      username: new FormControl(username),
      password: new FormControl(password),
      email: new FormControl(email),
    });
  }

  onUpdatePassword() {
    const newObj = {
      Username: this.forgotPassForm.value['username'],
      Password: this.forgotPassForm.value['password'],
      EmailAddress: this.forgotPassForm.value['email'],
    };

    if (this.confirmedCreds == false) {
      this.userService.getUserByUsername(newObj.Username).subscribe((res) => {
        if (res.length >= 1) {
          if (res[0].emailAddress == newObj.EmailAddress) {
            this.sourceNum = res[0].sourceNum;
            this.confirmedCreds = true;
          } else {
            this.alertService.alert(
              'error',
              'Invalid email/username',
              'Please submit a correct email/username'
            );
          }
        } else {
          this.alertService.alert(
            'error',
            'Invalid email/username',
            'Please submit a correct email/username'
          );
        }
      });
    } else {
      this.userService.changePassword(this.sourceNum, newObj.Password).subscribe(res => {
        if (res == 1) {
          this.alertService.alertMixin(5000, 'success', 'Password changed successfully').fire();
          this.forgotPassForm.reset();
          this.router.navigate(['Login'], { relativeTo: this.route.parent });

        } else if (res == -2) {
          this.alertService.alert('error', 'Change Password', 'Password change failed');
        }
      })
    }
    
  }
}
