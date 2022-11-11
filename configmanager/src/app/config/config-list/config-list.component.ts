import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { NumeroService } from 'src/services/numero.service';
import { Numero } from '../../../models/numeros.model';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit, OnDestroy {
  numeros: Numero[];
  originalNumerosList: Numero[];
  p: number = 1;
  PencilIcon = faPencil;
  TrashIcon = faTrash;

  private numChangeSub: Subscription;

  constructor(private numeroService: NumeroService,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.spinnerService.show();
    
    this.numeroService.getNumeros().subscribe(res => {
        this.numeros = res;
        this.originalNumerosList = res;
        this.spinnerService.hide();
    });

    this.numChangeSub = this.numeroService.changedNumeros
    .subscribe((numeros : Numero[]) => {
      this.numeros = numeros;
      this.p = 1;
    })
  }

  ngOnDestroy(): void {
    this.numChangeSub.unsubscribe();
  }  
  
  onDeleteConfig(numero) {
    
    const deleteNumero = [{
      "numero": numero.numero,
      "description": "",
      "client": "",
      "remarks": ""
     }];

     this.alertService.alertConfirm('question', 'Are you sure?', '<p>Do you really wish to delete</p> <p style="color:red">' + numero.numero + '-' + numero.description + '?</p>')
     .then((result) => {
      if (result.isConfirmed) {
        this.spinnerService.show();
        this.numeroService.deleteNumero(deleteNumero).subscribe(res => {
          this.spinnerService.hide();
          this.alertService.alertMixin(5000, 'success', 'Deleted successfully').fire();
          const index = this.numeros.findIndex(a => a.numero == numero.numero);
          this.numeros.splice(index, 1);
          this.numeroService.changedNumeros.next(this.numeros);
        })
      } else if (result.isDenied) {
        return false;
      }
    })
  }

  onEditConfig(numero) {
    this.router.navigate(['Edit/' + numero.numero], {relativeTo: this.route.parent});
  }

}
