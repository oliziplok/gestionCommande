import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {MatDialogRef} from '@angular/material';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  addCommande: FormGroup;
  listingProduits = [];
  showLoader = false;

  constructor(public formBuilder: FormBuilder, public clientSupplier: ClientService, private supplierService: SupplierService,
              private dialogRef: MatDialogRef<AddCommandeComponent>, private authService: AuthenticationService) {
    this.addCommande = formBuilder.group({
      // company: ['', Validators.compose([Validators.required])],
      // name: ['', Validators.compose([Validators.required])],
      // email: ['', Validators.compose([Validators.required])],
      // buyCondition: ['', Validators.compose([Validators.required])],
      // recepAddress: ['', Validators.compose([Validators.required])],
      // shipAddress: ['', Validators.compose([Validators.required])],
      // logo: [''],
      fkidClient: [this.authService.getID()],
      produits: this.formBuilder.array([], Validators.required),
      commentaire: ['']
    });
  }

  ngOnInit() {
    this.supplierService.getSupplierProducts().subscribe((res) => {
      console.log(res);
      this.listingProduits = res;
      // const formArray = this.addCommande.controls.produits as FormArray;
      // for (const response of res) {
      //   formArray.push(new FormControl(response, Validators.required));
      // }
    }, (err) => {
      console.log(err);
    });
  }

  createItem(idR, nameR, formatR): FormGroup {
    return this.formBuilder.group({
      idProduct: idR,
      name: nameR,
      format: formatR,
      Qty: ['', Validators.compose([Validators.required])]
    });
  }

  addItem(produitRecu): void {
    console.log(produitRecu);

    const items = this.addCommande.get('produits') as FormArray;
    for (let i = 0; i < items.controls.length; i++) {
      console.log(items.controls[i].value.idProduct);
      console.log(produitRecu);
      if (items.controls[i].value.idProduct === produitRecu.id) {
        items.removeAt(i);
        return;
      }
    }
    items.push(this.createItem(produitRecu.id, produitRecu.nom, produitRecu.format));
    console.log(this.addCommande.controls.produits);
  }

  onAdd() {
    console.log(this.addCommande);
    this.showLoader = true;
    this.clientSupplier.addOrder(this.addCommande.value).then(() => {
      this.showLoader = false;
      this.dialogRef.close(true);
    }).catch((err) => {
      console.log(err);
      this.showLoader = false;
    });
  }
}
