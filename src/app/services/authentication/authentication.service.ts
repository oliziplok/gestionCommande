import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private islogIn = false;

  constructor(private router: Router) { }

  isAuthenticated() {
    return this.islogIn;
  }

  logIn(username, password) {
    if (username === '' && password === '') {
      console.log(username, password);
      this.islogIn = true;
      this.router.navigate(['']);
    }
  }

  logOut() {
    this.islogIn = false;
    this.router.navigate(['/login']);
  }
}
