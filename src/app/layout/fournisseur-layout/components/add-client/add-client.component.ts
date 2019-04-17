import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../../services/client/client.service';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  showLoader = false;
  addUserForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private supplierService: SupplierService,
              private dialogRef: MatDialogRef<AddClientComponent>) {

    this.addUserForm = formBuilder.group({
      compagny: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      buy_condition: ['', Validators.compose([Validators.required])],
      rec_adress: ['', Validators.compose([Validators.required])],
      ship_adress: ['', Validators.compose([Validators.required])],
      logo: ['']
    });
  }

  ngOnInit() {
  }

  onFileInput(imageInput) {
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      console.log(event);
      const selectedFile = {
        src: event.target.result,
        file: file
      };
      this.addUserForm.controls.logo.setValue(selectedFile.src);
    });

    reader.readAsDataURL(file);
  }

  deleteImage() {
    this.addUserForm.controls.logo.setValue('');
  }

  onAdd() {
    // const body: any = {};
    //
    // body.nom = this.addUserForm.controls.name.value;
    // body.courriel = this.addUserForm.controls.email.value;
    // body.condition_achat = this.addUserForm.controls.buyCondition.value;
    // body.adresseFacturation = this.addUserForm.controls.recepAddress.value;
    // body.adresseLivraison = this.addUserForm.controls.shipAddress.value;
    // body.fkidSupplier = 1;

    this.showLoader = true;
    this.supplierService.addClient(this.addUserForm.value).then((res) => {
      console.log(res);
      this.showLoader = false;
      this.dialogRef.close();
    }).catch((err) => {
      this.showLoader = false;
      console.log(err);
    });
  }
}
