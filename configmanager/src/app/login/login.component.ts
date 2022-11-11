import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { AuthService } from 'src/services/guards/auth.service';
import { NumeroService } from 'src/services/numero.service';
import * as CryptoJS from 'crypto-js';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDisable: boolean = false;
  cypherText = '';
  submitButtonName = 'Sign in';

  constructor(
    private numeroService: NumeroService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('userSession')) {
      this.router.navigate(['Dashboard'], { relativeTo: this.route.parent });
    }
  }

  onSubmit() {

    this.submitButtonName = 'Please wait'

    const loginUser = [
      {
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      },
    ];

    const todaySession = new Date().getTime().toString();

    this.loginDisable = true;
    this.authService.logingUser(loginUser[0].username).subscribe((res) => {
      if (res.length > 0) {
        if (loginUser[0].password === res[0].password) {
          sessionStorage.setItem('userSession', todaySession);
          sessionStorage.setItem(
            'session',
            this.encryptDecryptService.encryptData(JSON.stringify(res[0]))
          );
          this.router.navigate([''], { relativeTo: this.route.parent });
        } else {
          this.alertService.alert(
            'error',
            'Login Error',
            'Invalid username/password'
          );
          this.loginDisable = false;
          this.loginForm.controls.password.reset('');
          this.submitButtonName = 'Sign in';
        }
      } else {
        this.alertService.alert(
          'error',
          'Login Error',
          'Invalid username/password'
        );
        this.loginDisable = false;
        this.loginForm.controls.password.reset('');
        this.submitButtonName = 'Sign in';
      }
    });
  }

  private initForm() {
    let username = '';
    let password = '';

    this.loginForm = new FormGroup({
      username: new FormControl(username),
      password: new FormControl(password),
    });
  }

  onSignUpUser() {
    this.router.navigate(['Signup'], { relativeTo: this.route.parent });
  }

  onForgotPassword() {
    this.router.navigate(['ForgotPassword'], { relativeTo: this.route.parent });
  }
}
