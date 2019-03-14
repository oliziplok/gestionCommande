import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  role;

  constructor(public auth: AuthenticationService) {
    this.role = this.auth.getRole();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    console.log(expectedRole);
    console.log(this.role);
    console.log(this.auth.isAuthenticated());

    if (!this.auth.isAuthenticated() || expectedRole !== this.role) {
      console.log('Bad Role');
      return false;
    }
    console.log('Good Role');
    return true;
  }
}
