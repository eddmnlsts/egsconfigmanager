import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Numero } from 'src/models/numeros.model';
import { AlertService } from 'src/services/alert.service';
import { GlobalService } from 'src/services/global.service';
import { NumeroService } from 'src/services/numero.service';
import { faSearch, faAdd, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import fileDownload from 'js-file-download';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css'],
})
export class CommandsComponent implements OnInit {

  searchItem: string;
  disableExport = false;

  //icons
  iconSearch = faSearch;
  iconAdd = faAdd;
  iconDownload = faFileDownload;

  constructor(
    private numeroService: NumeroService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private globalService: GlobalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onSearchItem() {
    const searchItem = this.searchItem;
    
    if (searchItem != undefined) {
        this.spinnerService.show();
        this.numeroService.onSearchNumero(searchItem).subscribe(res => {
                this.globalService.numero = res;
                this.globalService.numero = this.globalService.numero.sort((a, b) => b.numero - a.numero)
                this.numeroService.changedNumeros.next(this.globalService.numero.slice());
                this.spinnerService.hide();
            });
    } else {
      alert('Please enter a text')
    }
  }

  onClearSearchItem() {
    this.searchItem = '';
  }

  onNewConfig() {
    this.alertService.alertConfirm('question', 'Are you sure?',  '<p>The numero will be automatically generated.</p> <p style="color:red">Do you wish to continue?</p>')
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['New'], { relativeTo: this.route.parent });
      } else {
        return false;
      }
    });
  }

  onHandleExport() {
    try {
      this.disableExport = true;
      this.alertService.alertMixin(5000, 'success', 'Download started please wait...').fire();
      this.numeroService.getNumeros().subscribe(res => {
        let numero_list = "";
        res.map(function(data) {
             const rmrks = data.remarks == null ? 'No remarks' : data.remarks;
             numero_list = numero_list + data.description.toString() + " = " + data.numero.toString() + "     '" + rmrks  + " - " + data.client.toString() + "\n"
        });
        numero_list = "Public Enum enumNumeros \r\n\r\n\r\n" + numero_list + "\r\n\r\n\r\n End Enum";
        const date = new Date();
        const today = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + "" + date.getMilliseconds();
        const fileName = "numero" + today + ".txt"
        
        fileDownload(numero_list, fileName);
        this.disableExport = false;
      });
    } 
    catch (err) {

    }
    
  }
}
