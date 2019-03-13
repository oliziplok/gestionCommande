import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // If not, they redirect them to the login page
    this.router.navigate(['/login']);
    // Check to see if a user has a valid token
    return false;
  }
}
