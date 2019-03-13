import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private islogIn = false;
  private role = 'client';
  // private role = 'fournisseur';

  constructor(private router: Router) { }

  isAuthenticated() {
    return this.islogIn;
  }

  getRole() {
    return this.role;
  }

  logIn(username, password) {
    if (username === '' && password === '') {
      console.log(username, password);
      this.islogIn = true;
      if (this.role === 'client') {
        this.router.navigate(['client/home']);
      } else if (this.role === 'fournisseur') {
        this.router.navigate(['fournisseur/home']);
      }
    }
  }

  logOut() {
    this.islogIn = false;
    this.router.navigate(['/login']);
  }
}
