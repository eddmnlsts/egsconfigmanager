import { Component, Input, OnInit } from '@angular/core';
import { Generic } from 'src/models/generic.model';
import { faPencil, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/services/configuration.service';
import { AlertService } from 'src/services/alert.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() myData : Generic[];
  codeTable: number; 

  PencilIcon = faPencil;
  TrashIcon = faTrash;
  AddIcon = faAdd;

  private picklistChangeSub: Subscription;
  loggedinUser;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private configurationService: ConfigurationService,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.picklistChangeSub = this.configurationService.changedPicklist
    .subscribe((gnrc : Generic[]) => {
      this.myData = gnrc;
     })

  }

  onAddItem(type) {
    this.router.navigate(['New'], { relativeTo: this.route.parent, queryParams: {PLType: type}});
  }

  onDeleteItem(data, pltype) {

    if (pltype === 'client') {
      this.codeTable = 1
     } else if (pltype === 'department') {
      this.codeTable = 2
     } else {
      this.codeTable = 3
     }

    this.alertService.alertConfirm('question', 'Are you sure?', 'Do you really wish to delete a ' + pltype + ' <b>' + data.description + '</b>?')
    .then((result) => {
     if (result.isConfirmed) {
      this.spinnerService.show();
      this.configurationService.deletePicklist(data.code, this.codeTable).subscribe(res => {
        if (res) {
          this.spinnerService.hide();
          this.alertService.alertMixin(5000, 'success', 'Deleted successfully').fire();
          const index = this.myData.findIndex(a => a.code == data.code);
          this.myData.splice(index, 1);
          this.configurationService.changedPicklist.next(this.myData);
        }
      });
    } else if (result.isDenied) {
      return false;
    }
    });
   
  }

  onEditItem(data, pltype) {
    this.router.navigate(['Edit'], { relativeTo: this.route.parent, queryParams: {PLType: pltype, code: data.code, value: data.description}});
  }
}
