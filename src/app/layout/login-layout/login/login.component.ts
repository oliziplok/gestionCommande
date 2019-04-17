import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usrn;
  password;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    console.log(this.usrn, this.password);
    this.authService.logInAuth(this.usrn, this.password).then((res) => {
      if (res === 'client') {
        console.log('trigger');
        this.router.navigate(['client/home']);
      } else if (res === 'fournisseur') {
        this.router.navigate(['fournisseur/home']);
      }
    });
  }
}
