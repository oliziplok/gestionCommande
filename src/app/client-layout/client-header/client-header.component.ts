import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
  }
}
