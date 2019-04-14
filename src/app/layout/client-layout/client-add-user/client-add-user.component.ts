import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-client-add-user',
  templateUrl: './client-add-user.component.html',
  styleUrls: ['./client-add-user.component.css']
})
export class ClientAddUserComponent implements OnInit {

  addUser: FormGroup;
  showLoader = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
              private dialogRef: MatDialogRef<ClientAddUserComponent>) {
    this.addUser = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onAdd() {
    this.showLoader = true;
    this.clientService.createNewUser(this.addUser.value).then((res) => {
      this.showLoader = false;
      this.dialogRef.close(true);
    }).catch((err) => {
      this.showLoader = false;
    });
  }
}
