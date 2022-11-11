import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faFloppyDisk, faCancel, faPencil } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/services/alert.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  @Input() loggedUser;
  @Output() loggedUserOutput = new EventEmitter<string[]>();
  edituserForm: FormGroup;

  //icons
  iconDisk = faFloppyDisk;
  iconPen = faPencil;
  iconCancel = faCancel;

  //variables
  isEdit = false;
  username = '';
  password = '';
  

  constructor(private alertService: AlertService,
              private userService: UserService) { }

  ngOnInit(): void { 
    this.initForm(this.loggedUser.username, this.loggedUser.password);
  }

  onSetupEdit() {
    this.alertService.alertConfirm('question','Change password?', 'Are you sure? <br>You might need to input your current password.')
    .then((result) => {
      if (result.isConfirmed) {
        this.alertService.alertText('Enter your current password', this.edituserForm.controls['password'].value, true, 'You have entered an invalid password!')
        .then((result) => {
          if (result.isConfirmed) {
            this.isEdit = true;
            this.edituserForm.controls['password'].enable();
          }
        });
      }
    });
  }

  onSaveEdit() {
    const newEditUser = [{
      "sourceNum": this.loggedUser.sourceNum,
      "username": this.loggedUser.username,
      "password": this.edituserForm.value["password"]
     }];

    this.userService.changePassword(newEditUser[0].sourceNum, newEditUser[0].password).subscribe(res => {
      if (res == 1) {
        this.alertService.alertMixin(5000, 'success', 'Password changed successfully').fire();
        this.loggedUser.password =  this.edituserForm.value["password"];
        this.loggedUserOutput.emit(this.loggedUser);
        this.onCancelEdit();
      } else if (res == -2) {
        this.alertService.alert('error', 'Change Password', 'Password change failed');
      }
    })
  }

  onCancelEdit() {
    this.isEdit = false;
    this.edituserForm.controls['password'].disable();
  }

  private initForm(username, password) {
    let uname = username;
    let pword = password;

    this.edituserForm = new FormGroup({
      'username' : new FormControl(uname),
      'password' : new FormControl(pword)
    })
    this.edituserForm.controls['username'].disable();
    this.edituserForm.controls['password'].disable();
  }

}
