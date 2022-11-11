import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { Numero } from "src/models/numeros.model";
import { AppService } from "./app.service";

@Injectable({
    providedIn: 'root'
  })
export class NumeroService {

    numeros: Numero[];
    originalNumerosList: Numero[];
    changedNumeros = new Subject<Numero[]>();

    constructor(private appService: AppService) {}


    getNumeros() {
        return this.appService.getNumeroList();
    }

    getNumero(numero) {
        return this.appService.getNumero(numero);
    }

    onSearchNumero(searchItem: string) {
        return this.appService.searchNumeroDesc(searchItem);
    }

    onGetMaxNumero() {
        return this.appService.getMaxNumero();
    }

    insertNumero(numeroForm) {
        return this.appService.insertNumero(numeroForm);
    }

    updateNumero(numeroForm) {
        return this.appService.updateNumero(numeroForm);
    }

    deleteNumero(numeroForm) {
        return this.appService.deleteNumero(numeroForm);
    }

    insertNumeroHistory(numeroHistory) {
        return this.appService.insertNumeroHistory(numeroHistory);
    }

    updateNumeroHistory(numeroHistory) {
        return this.appService.updateNumeroHistory(numeroHistory);
    }

   
   

}