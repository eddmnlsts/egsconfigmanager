import { Component} from '@angular/core';
import { NumeroService } from 'src/services/numero.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  configCountByUser = 0;
  lastConfigNumero = '';
  lastConfigDescription = '';
  lastConfigClient = ''

 constructor(private userService: UserService, private numeroService: NumeroService) {
    let sourcenum = this.userService.getLoggedInUserDetails().sourceNum;

    this.getConfigCount(sourcenum);
    this.getLastNumeroCreated();  
 }

 getConfigCount(sourcenum) {
  this.userService.getConfigCountByUser(sourcenum).subscribe(res => {
      if (res > 0) {
        this.configCountByUser = res;
      }
  })
 }

 getLastNumeroCreated() {
  this.numeroService.getNumeros().subscribe(res => {
    if (res.length > 0) {
      this.lastConfigNumero = res[0].numero;
      this.lastConfigDescription = res[0].description;
      this.lastConfigClient = res[0].client;
    }
  })
 }

}
