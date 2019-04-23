import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  role;

  constructor(public auth: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.role = this.auth.getRole();

    const expectedRole = route.data.expectedRole;

    if (!this.auth.isAuthenticated() || expectedRole !== this.role) {
      return false;
    }
    return true;
  }
}
