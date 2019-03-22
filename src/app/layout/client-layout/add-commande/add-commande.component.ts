import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  addCommande: FormGroup;
  listingProduits;
  showLoader = false;

  constructor(public formBuilder: FormBuilder, public clientSupplier: ClientService,
              private dialogRef: MatDialogRef<AddCommandeComponent>) {
    this.addCommande = formBuilder.group({
      // company: ['', Validators.compose([Validators.required])],
      // name: ['', Validators.compose([Validators.required])],
      // email: ['', Validators.compose([Validators.required])],
      // buyCondition: ['', Validators.compose([Validators.required])],
      // recepAddress: ['', Validators.compose([Validators.required])],
      // shipAddress: ['', Validators.compose([Validators.required])],
      // logo: [''],
      produits: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit() {
    this.clientSupplier.getProductsAvailableForUser().then((res) => {
      this.listingProduits = res;
      // const formArray = this.addCommande.controls.produits as FormArray;
      // for (const response of res) {
      //   formArray.push(new FormControl(response, Validators.required));
      // }
    }).catch((err) => {
      console.log(err);
    });
  }

  createItem(idR, nameR, formatR): FormGroup {
    return this.formBuilder.group({
      id: idR,
      name: nameR,
      format: formatR,
      qtt: ['', Validators.compose([Validators.required, Validators.pattern('^[0-255]$')])]
    });
  }

  addItem(produitRecu): void {
    console.log(produitRecu);

    const items = this.addCommande.get('produits') as FormArray;
    for (let i = 0; i < items.controls.length; i++) {
      if (items.controls[i].value.id === produitRecu.id) {
        items.removeAt(i);
        return;
      }
    }
    items.push(this.createItem(produitRecu.id, produitRecu.name, produitRecu.format));
    console.log(this.addCommande.controls.produits);
  }

  onAdd() {
    console.log(this.addCommande);
    this.showLoader = true;
    this.clientSupplier.addOrder(this.addCommande).then(() => {
      this.showLoader = false;
      this.dialogRef.close(true);
    }).catch((err) => {
      console.log(err);
    });
  }

}
