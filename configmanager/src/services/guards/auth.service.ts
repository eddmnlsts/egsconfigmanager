import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/models/user.model';
import { AppService } from '../app.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  loggedInUser: User;


  constructor(private appService: AppService) {}

  public isAuthenticated(): boolean {
    if (sessionStorage.getItem('userSession')) {
      return true;
    } else {
      return false;
    }
  }

  logingUser(username) {
    this.loggedIn = true;
    return this.appService.loginUser(username);
  }

  logout() {
    this.loggedIn = false;
  }

}
