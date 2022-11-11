import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';
import { GlobalService } from 'src/services/global.service';
import { ThirdPartyService } from 'src/services/thirdpartyservice';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  fullName = '';
  email = '';
  loggedUser;
  initials = '';
  imagePath = '';
  quoteoftheday = '';
  author = '';
  isLoading = false;

  constructor(private encryptDecryptService: EncryptDecryptService,
              private globalService: GlobalService,
              private thirdPartyService: ThirdPartyService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(this.encryptDecryptService.decryptData(sessionStorage.getItem('session')));
    this.fullName = this.globalService.convertToProper(this.loggedUser.fullName);
    this.email = this.loggedUser.emailAddress;
    this.getQuoteOfTheDay();
  }

  getQuoteOfTheDay() {
    this.spinnerService.show();
    this.isLoading = true;
    this.thirdPartyService.getQuoteOfTheDay().subscribe(res => {
      this.quoteoftheday = res.contents.quotes[0].quote;
      this.author = res.contents.quotes[0].author;
      this.isLoading = false;
      this.spinnerService.hide();
    })
  }

}
