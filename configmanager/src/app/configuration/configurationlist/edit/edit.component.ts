import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/services/alert.service';
import { ConfigurationService } from 'src/services/configuration.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

  SaveIcon = faSave;
  XIcon = faX;

  
  picklistType;
  picklistForm: FormGroup;

  id: number;
  editMode: boolean = false;
  codeTable: number = 0;
  code: number = 0;
  value: string = ''

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertService,
              private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.picklistType = queryParams['PLType'];
      this.editMode = queryParams['code'] > 0 ? true: false;
      this.code = queryParams['code'] == undefined ? 1: parseInt(queryParams['code'])
      this.value = queryParams['value'];
      this.initForm();
    });
  }

  onSubmit() {

    const newParam = {
      "code": this.code,
      "description": this.picklistForm.value["description"]
     };

     if (this.picklistType === 'client') {
      this.codeTable = 1
     } else if (this.picklistType === 'department') {
      this.codeTable = 2
     } else {
      this.codeTable = 3
     }

     if (this.editMode == false) {
      this.configurationService.insertUpdatePicklist(newParam, this.codeTable, 1).subscribe(res=> {
        if (res == -1) {
          this.alertService.alertMixin(5000, 'success', 'Saved successfully').fire();
          this.spinnerService.hide();
          this.navigatePicklist();
        }
      });
     } else {
      this.configurationService.insertUpdatePicklist(newParam, this.codeTable, 2).subscribe(res=> {
        if (res == -1) {
          this.alertService.alertMixin(5000, 'success', 'Updated successfully').fire();
          this.spinnerService.hide();
          this.navigatePicklist();
        }
      });
     }
  }

  onClose() {
    this.navigatePicklist();
  }

  private initForm() {
    let description = '';

    if (this.editMode) { 
      description = this.value
    }
    this.picklistForm = new FormGroup({
      description: new FormControl(description)
    });
  }

  navigatePicklist() {
    if (this.picklistType === 'client') {
      this.router.navigate(['Client'], {relativeTo: this.route.parent});
     } else if (this.picklistType === 'department') {
      this.router.navigate(['Department'], {relativeTo: this.route.parent});
     } else {
      this.router.navigate(['Position'], {relativeTo: this.route.parent});
     }
  }
}
