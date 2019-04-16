import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-client-add-user',
  templateUrl: './client-add-user.component.html',
  styleUrls: ['./client-add-user.component.css']
})
export class ClientAddUserComponent implements OnInit {

  addUser: FormGroup;
  showLoader = false;
  edit: boolean = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
              private dialogRef: MatDialogRef<ClientAddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    if (this.data === null) {
      this.addUser = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    } else {
      this.edit = true;
      this.addUser = formBuilder.group({
        username: this.data.user.username,
        password: ['', Validators.required]
      });
    }
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

  onChangePassword() {
    this.showLoader = true;
    this.clientService.changePassword(this.data.user.id, this.addUser.value).then((res) => {
      this.showLoader = false;
      this.dialogRef.close(true);
    }).catch((err) => {
      this.showLoader = false;
    });
  }
}
