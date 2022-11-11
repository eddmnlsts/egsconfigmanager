import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'configmanager';
  showHeader: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/Login' || event['url'] == '/Signup' || event['url'] == '/ForgotPassword') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnInit(): void {
  }

 


}
