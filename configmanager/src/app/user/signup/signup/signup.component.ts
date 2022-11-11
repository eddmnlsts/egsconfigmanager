import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/models/user.model';
import { AlertService } from 'src/services/alert.service';
import { UserService } from 'src/services/user.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/guards/auth.service';
import { ConfigurationService } from 'src/services/configuration.service';
import { Generic } from 'src/models/generic.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  imageFile;
  user: User;
  department: Generic;
  position: Generic;
  signupForm: FormGroup;
  infoCircleIcon = faInfoCircle; //icon

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.onLoadDepartment();
    this.onLoadPosition();
    this.initForm();
  }

  onCancelCreateUser() {
    this.router.navigate(['Login'], { relativeTo: this.route.parent });
  }

  onCreateUser() {
    this.spinnerService.show();

    const imgFile = {
      Name: this.imageFile == undefined ? '' : this.imageFile.file.name,
      Size: this.imageFile == undefined ? 0 : this.imageFile.file.size,
      Type: this.imageFile == undefined ? '' : this.imageFile.file.type,
      Src: this.imageFile == undefined ? '' : this.imageFile.src,
    };

    const newUser = {
      SourceNum: 999,
      FullName: this.signupForm.value['fullname'],
      Username: this.signupForm.value['username'],
      Password: this.signupForm.value['password'],
      EmailAddress: this.signupForm.value['email'],
      Department: parseInt(this.signupForm.value['department']),
      Position: parseInt(this.signupForm.value['position']),
      Image: imgFile,
    };
    this.userService.createUser(newUser).subscribe((res) => {
      if (res !== -2) {
        this.alertService.alert(
          'success',
          'User Created',
          'User created successfully'
        )
        
        this.spinnerService.hide();
      }

      this.signupForm.reset();
      this.router.navigate(['Login'], { relativeTo: this.route.parent });
    });
  }

  handleFileImage($event) {
    this.imageFile = $event;
  }

  initForm() {
    let username = '';
    let password = '';
    let fullname = '';
    let email = '';
    let department = -1;
    let position = -1;

    this.signupForm = new FormGroup({
      username: new FormControl(username),
      password: new FormControl(password),
      fullname: new FormControl(fullname),
      email: new FormControl(email),
      department: new FormControl(department),
      position: new FormControl(position),
    });
    
  }

  onLoadDepartment() {
    this.configurationService.getPicklist(2).subscribe(res => {
        this.department = res;
    })
  }

  onLoadPosition() {
    this.configurationService.getPicklist(3).subscribe(res => {
      this.position = res;
      this.spinnerService.hide();
  })
  }

}
