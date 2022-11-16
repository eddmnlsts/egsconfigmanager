import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  //log off details
  isLogin = false;
  interV;
  minutes;
  seconds;
  distance;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private alertService: AlertService
  ) {
    if (this.isUserLoggedIn()) {
      this.isLogin = true;
    }
    this.lastAction(new Date());
    this.check();
    this.initListener();
    this.initInterval();
  }

  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', value);
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      this.interV = setInterval(() => {
        this.check();
      }, 1000);
    });
  }

  /**
   * reset timer
   */
  reset() {
    this.lastAction(new Date());
  }

  /**
   * check timer
   */
  check() {
    const timerInMinutes = 10; //this is the set time

    const futureDate =
      new Date(this.getLastAction()).getTime() + timerInMinutes * 60000;

    this.distance = futureDate - new Date().getTime();

    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);


    this.ngZone.run(() => {
      if (this.isUserLoggedIn()) {
        if (this.minutes < 1) {
          clearInterval(this.interV);
          this.alertService
            .alertTimer('Session is about to expire', this.seconds)
            .then((result) => {
              if (result == false) {
                sessionStorage.removeItem('userSession');
                sessionStorage.removeItem('session');
                localStorage.removeItem('lastAction');
                this.router.navigate(['/Login']);
              } else if (result == true) {
                this.initInterval();
                this.reset();
                this.check();
              }
            });
        }
      }
    });
  }

  /**
   *check if a user is logged in
   */
  isUserLoggedIn(): string {
    return sessionStorage.getItem('userSession');
  }
}
