import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private islogIn = false;
  // private islogIn = true;
  private role = 'client';
  private id = 1;
  // private role = 'fournisseur';

  constructor(private router: Router) { }

  isAuthenticated() {
    return this.islogIn;
  }

  getRole() {
    return this.role;
  }

  getID() {
    return this.id;
  }

  logIn(username, password) {
    // if (username === '' && password === '') {
      console.log(username, password);
      if (username === 'client') {
        this.role = 'client';
        this.islogIn = true;
      } else if (username === 'fournisseur') {
        this.role = 'fournisseur';
        this.islogIn = true;
      }
      console.log(this.role);
      if (this.role === 'client') {
        this.router.navigate(['client/home']);
      } else if (this.role === 'fournisseur') {
        this.router.navigate(['fournisseur/home']);
      }
    // }
  }

  logOut() {
    this.islogIn = false;
    this.router.navigate(['/login']);
  }
}
