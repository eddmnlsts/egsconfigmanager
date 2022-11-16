import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/guards/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-configurationlist',
  templateUrl: './configurationlist.component.html',
  styleUrls: ['./configurationlist.component.css']
})
export class ConfigurationlistComponent implements OnInit {

  loggedinUser;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loggedinUser = this.userService.getLoggedInUserDetails();
  }
  


}
