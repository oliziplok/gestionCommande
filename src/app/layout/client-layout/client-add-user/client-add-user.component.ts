import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-client-add-user',
  templateUrl: './client-add-user.component.html',
  styleUrls: ['./client-add-user.component.css']
})
export class ClientAddUserComponent implements OnInit {

  addUser: FormGroup;
  showLoader = false;
  edit: boolean = false;
  userType;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
              private supplierService: SupplierService,
              private dialogRef: MatDialogRef<ClientAddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    if (this.data.user === undefined) {
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
    this.userType = this.data.userType;
  }

  ngOnInit() {
  }

  onAdd() {
    this.showLoader = true;
    if (this.userType === 'client') {
      this.clientService.createNewUser(this.addUser.value).then((res) => {
        this.showLoader = false;
        this.dialogRef.close(true);
      }).catch((err) => {
        this.showLoader = false;
      });
    } else {
      this.supplierService.createNewUser(this.addUser.value).then((res) => {
        this.showLoader = false;
        this.dialogRef.close(true);
      }).catch((err) => {
        this.showLoader = false;
      });
    }
  }

  onChangePassword() {
    this.showLoader = true;
    if (this.userType === 'client') {
      this.clientService.changePassword(this.data.user.id, this.addUser.value).then((res) => {
        this.showLoader = false;
        this.dialogRef.close(true);
      }).catch((err) => {
        this.showLoader = false;
      });
    } else {
      this.supplierService.changePassword(this.data.user.id, this.addUser.value).then((res) => {
        this.showLoader = false;
        this.dialogRef.close(true);
      }).catch((err) => {
        this.showLoader = false;
      });
    }
  }
}
