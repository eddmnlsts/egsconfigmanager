import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/guards/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
