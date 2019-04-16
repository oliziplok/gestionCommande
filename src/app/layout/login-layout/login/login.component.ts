import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usrn;
  password;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logIn() {
    console.log(this.usrn, this.password);
    this.authService.logInAuth(this.usrn, this.password);
  }
}
