import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from "./app.service";

@Injectable()
export class ThirdPartyService {
    
    constructor(private appService: AppService,
        private spinnerService: NgxSpinnerService) {}


    getQuoteOfTheDay() {
        return this.appService.getQuoteOfTheDay();
    }

}