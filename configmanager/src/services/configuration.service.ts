import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Generic } from 'src/models/generic.model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  pickList: Generic[];
  changedPicklist = new Subject<Generic[]>();

  constructor(private appService: AppService) {}

  getPicklist(codeTable) {
    return this.appService.getPicklist(codeTable);
  }

  insertUpdatePicklist(generic, codeTable, action) {
    return this.appService.insertUpdatePicklist(generic, codeTable, action);
  }

  deletePicklist(code, codeTable) {
    return this.appService.deletePicklist(code, codeTable);
  }
}
