import { HttpClient } from "@angular/common/http";
import { HttpUtilityService } from "./http-utility.service";
import { Url as url } from "../app/shared/shared.url";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
  })
export class AppService {

    constructor(private http: HttpClient,
                private httpUtilityService: HttpUtilityService) {

    }

    public getNumeroList() {
        return this.httpUtilityService.get(url.getNumeroList);
    }

    public getUserByUsername(username: string) {
        return this.httpUtilityService.get(url.getUserByUsername + username);
    }

    public searchNumeroDesc(searchField: string) {
        return this.httpUtilityService.get(url.searchNumeroDesc + 'searchText=' + searchField);
    }

    public getMaxNumero() {
        return this.httpUtilityService.get(url.getMaxNumero);
    }

    public insertNumero(numeroForm) {
        return this.httpUtilityService.post(url.insertNumero, numeroForm);
    }

    public updateNumero(numeroForm) {
        return this.httpUtilityService.post(url.updateNumero, numeroForm);
    }

    public deleteNumero(numeroForm) {
        return this.httpUtilityService.post(url.deleteNumero, numeroForm);
    }

    public getNumero(numero) {
        return this.httpUtilityService.get(url.getNumero + numero);
    }

    public insertNumeroHistory(numeroHistory) {
        return this.httpUtilityService.post(url.insertNumeroHistory, numeroHistory);
    }

    public updateNumeroHistory(numeroHistory) {
        return this.httpUtilityService.post(url.updateNumeroHistory, numeroHistory);
    }

    public loginUser(username) {
        return this.httpUtilityService.get(url.loginUser + username);
    }

    public getClientCountChart() {
        return this.httpUtilityService.get(url.getClientCountChart1);
    }

    public createUser(userToCreate) {
        return this.httpUtilityService.post(url.createUser, userToCreate);
    }

    public getUserList() {
        return this.httpUtilityService.get(url.getUserList);
    }

    public changeUserPassword(sourcenum, newpassword) {
        return this.httpUtilityService.get(url.changeUserPassword + sourcenum + "/" + newpassword);
    }

    public getUserConfigHistory(sourcenum) {
        return this.httpUtilityService.get(url.getUserConfigHistory + sourcenum);
    }

    public getPicklist(codeTable) {
        return this.httpUtilityService.get(url.getPicklist + codeTable);
    }

    public insertUpdatePicklist(generic, codeTable, action) {
        return this.httpUtilityService.post(url.insertUpdatePicklist + "?codeTable=" + codeTable + "&action=" + action, generic);
    }

    public deletePicklist(code, codeTable) {
        return this.httpUtilityService.get(url.deletePicklist + code + "/" + codeTable);
    }

    public getConfigCountByUser(sourcenum) {
        return this.httpUtilityService.get(url.getConfigCountByUser + sourcenum);
    }



    //Third-party APIs
    public getQuoteOfTheDay() {
        return this.httpUtilityService.getThirdParty(url.getQuoteOfTheDay);
    }

}