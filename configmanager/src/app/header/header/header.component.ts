import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTachometer, faTools, faGear, faUser, faBook ,faSignOut } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/models/user.model';
import { AlertService } from 'src/services/alert.service';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';
import { GlobalService } from 'src/services/global.service';
import { AuthService } from 'src/services/guards/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Icons
  dashboardIcon = faTachometer;
  toolsIcon = faTools;
  gearIcon = faGear;
  signoutIcon = faSignOut;
  bookIcon = faBook;
  userIcon = faUser;

  //Variable
  fullName = '';
  email = '';
  loggedUser;
  initials = '';
  imagePath = '';
  userLogout: User;

  constructor(private authService: AuthService,
            private route: ActivatedRoute,
            private router: Router,
            private encryptDecryptService: EncryptDecryptService,
            private globalService: GlobalService,
            private alertService: AlertService) {}

  ngOnInit(): void {
    this.loggedUser = JSON.parse(this.encryptDecryptService.decryptData(sessionStorage.getItem('session')));
    this.fullName = this.globalService.convertToProper(this.loggedUser.fullName);
    this.email = this.loggedUser.emailAddress;
    this.initials = this.loggedUser.fullName.split(' ')[0].split('')[0] + this.loggedUser.fullName.split(' ')[this.loggedUser.fullName.split(' ').length - 1].split('')[0];
    this.initials = this.initials.toUpperCase();
    this.imagePath = this.loggedUser.imagePath;
  }

  onLogoutUser() {
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('session');
    this.router.navigate(['Login'], { relativeTo: this.route.parent });
  }

  onNavigateUserProfile() {
    this.router.navigate(['User'], { relativeTo: this.route.parent });
  }

  onNavigateConfigurationList() {
    this.router.navigate(['Configuration'], { relativeTo: this.route.parent });
  }

  onShowAbout() {
    this.alertService.alert('information', 'EGS Config Manager',
                '<p>All rights reserved 2022</p><p style="font-size:14px"><i>Enggist & Grandjean Software</i></p>');
  }
}
