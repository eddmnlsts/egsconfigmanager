import { Component, OnInit } from '@angular/core';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loggedUser;
  name;
  email;
  department;
  position;
  imageUser;
  initials;
  username;
  password;

  //icons
  envIcon = faEnvelope;

  constructor(
    private encryptDecryptService: EncryptDecryptService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.loggedUser = JSON.parse(
      this.encryptDecryptService.decryptData(sessionStorage.getItem('session'))
    );
    this.name = this.loggedUser.fullName.toUpperCase();
    this.email = this.loggedUser.emailAddress;
    this.imageUser = this.loggedUser.imagePath;
    this.department = this.loggedUser.department;
    this.position = this.loggedUser.position;
    this.initials =
      this.loggedUser.fullName.split(' ')[0].split('')[0] +
      this.loggedUser.fullName
        .split(' ')
        [this.loggedUser.fullName.split(' ').length - 1].split('')[0];
    this.username = this.loggedUser.username;
    this.password = this.loggedUser.password;

    this.spinnerService.hide();
  }

  loggedUserOutput(event) {
    sessionStorage.setItem(
      'session',
      this.encryptDecryptService.encryptData(JSON.stringify(event))
    );
  }
}
