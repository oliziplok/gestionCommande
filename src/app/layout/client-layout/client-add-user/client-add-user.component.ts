import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-client-add-user',
  templateUrl: './client-add-user.component.html',
  styleUrls: ['./client-add-user.component.css']
})
export class ClientAddUserComponent implements OnInit {

  addUser: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addUser = formBuilder.group({
      user: '',
      password: ''
    });
  }

  ngOnInit() {
  }

}
