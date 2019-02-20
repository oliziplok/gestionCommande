import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private clientService: ClientService) {

    this.addUserForm = formBuilder.group({
      company: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      buyCondition: ['', Validators.compose([Validators.required])],
      recepAddress: ['', Validators.compose([Validators.required])],
      shipAddress: ['', Validators.compose([Validators.required])],
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
    let body: any = {};

    body.nom = this.addUserForm.controls.name.value;
    body.courriel = this.addUserForm.controls.email.value;
    body.condition_achat = this.addUserForm.controls.buyCondition.value;
    body.adresseFacturation = this.addUserForm.controls.recepAddress.value;
    body.adresseLivraison = this.addUserForm.controls.shipAddress.value;
    body.fkidSupplier = 1;

    this.clientService.addClient(body).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
}
