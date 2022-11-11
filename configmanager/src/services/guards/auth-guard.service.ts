import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     return this.authService.isAuthenticated().then(
  //         (authenticated: boolean) => {
  //             if (authenticated) {
  //                 console.log('authenticated');
  //                 return true;
  //             } else {
  //                 this.router.navigate(['Login']);
  //             }
  //         }
  //     )
  // }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['Login'], { relativeTo: this.route.parent });
      return false;
    }
    return true;
    //  else {
    //   this.router.navigate(['Dashboard'], { relativeTo: this.route.parent });
    //   return true;
    // }
  }
}
