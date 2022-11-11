import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NumeroService } from 'src/services/numero.service';
import { Numero } from '../../../../models/numeros.model';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AlertService } from 'src/services/alert.service';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';
import { ConfigurationService } from 'src/services/configuration.service';
import { Generic } from 'src/models/generic.model';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements OnInit {
  id: number;
  editMode = false;
  numero: Numero;
  numeroForm: FormGroup;
  maxNumero: number;
  clients: Generic;

  infoCircleIcon = faInfoCircle; //icon
  Toast;
  loggedUser;

  constructor(private numeroService: NumeroService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertService,
              private encryptDecryptService: EncryptDecryptService,
              private configurationService: ConfigurationService) { }


  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.spinnerService.show();
        this.id = +params['id'];
        this.editMode =  params['id'] != null;
        this.onLoadClient();
        this.initForm();
      }
    )
  }

  onCancelConfig() {
    this.router.navigate(['List'], {relativeTo: this.route.parent});
  }

  private initForm() {
    let numero = '';
    let description = '';
    let client = "Generic";
    let remarks = '';


    if (this.editMode) {
      this.numeroService.getNumero(this.id).subscribe(res => {
          numero = res[0].numero;
          description = res[0].description;
          client = res[0].client;
          remarks = res[0].remarks;

          this.numeroForm = new FormGroup({
            'numero': new FormControl(numero),
            'description': new FormControl(description),
            'client': new FormControl(client),
            'remarks' : new FormControl(remarks)
          });
          
          this.spinnerService.hide();
      });
    } else {
      this.numeroService.onGetMaxNumero().subscribe(res => {
        this.maxNumero = res;
        numero = this.maxNumero.toString();

        this.numeroForm = new FormGroup({
          'numero': new FormControl(numero),
          'description': new FormControl(description),
          'client': new FormControl(client),
          'remarks' : new FormControl(remarks)
        });

        this.spinnerService.hide();
      });
    }

    this.numeroForm = new FormGroup({
      'numero': new FormControl(numero),
      'description': new FormControl(description),
      'client': new FormControl(client),
      'remarks' : new FormControl(remarks)
    });
    
  }

  onSubmit() {
    const newNumero = [{
      "numero": this.numeroForm.value["numero"],
      "description": this.numeroForm.value["description"],
      "client": this.numeroForm.value["client"],
      "remarks": this.numeroForm.value["remarks"]
     }];

    this.spinnerService.show();

    if (this.editMode == false) {
      newNumero[0].numero = this.maxNumero;
      this.numeroService.insertNumero(newNumero).subscribe(res => {
        this.onHandleConfigHistory();
        this.router.navigate(['List'], {relativeTo: this.route.parent});
        this.alertService.alertMixin(5000, 'success', 'Saved successfully').fire();
        this.spinnerService.hide();
      })
    } else {
      this.numeroService.updateNumero(newNumero).subscribe(res => {
        this.onHandleConfigHistory();
        this.router.navigate(['List'], {relativeTo: this.route.parent});
        this.alertService.alertMixin(5000, 'success', 'Updated successfully').fire();
        this.spinnerService.hide();
      })
    }
    

   
  }

  onGetMaxNumero() {
    this.numeroService.onGetMaxNumero().subscribe(res => {
      this.maxNumero = res;
      this.initForm();
      this.spinnerService.hide();
    });
  }
    
  onHandleConfigHistory() {
    this.loggedUser = JSON.parse(this.encryptDecryptService.decryptData(sessionStorage.getItem('session')));
    var today = new Date();

    const newHistory = [{
      "numero": parseInt(this.numeroForm.value["numero"]),
      "sourcenumero": this.loggedUser.sourceNum, //to be updated later to user code
      "datecreated": today,
      "datemodified": today
     }];

     if (this.editMode == false) {
      this.numeroService.insertNumeroHistory(newHistory).subscribe(res => {
      });
     } else {
      this.numeroService.updateNumeroHistory(newHistory).subscribe(res => {
      })
     }     

  }

  onLoadClient() {
    this.configurationService.getPicklist(1).subscribe(res => {
      this.clients = res;
    })
  }
  


 
  

}
