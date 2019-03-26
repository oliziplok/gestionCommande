import { Component, OnInit } from '@angular/core';
import {AddCommandeComponent} from '../add-commande/add-commande.component';
import {ClientAddUserComponent} from '../client-add-user/client-add-user.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {SupplierService} from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './client-utilisateurs.component.html',
  styleUrls: ['./client-utilisateurs.component.css']
})
export class ClientUtilisateursComponent implements OnInit {

  users = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private clientProvider: ClientService,
              private router: Router, private supplierService: SupplierService) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url.includes('fournisseur')) {
      this.supplierService.getSupplierUsersListing().subscribe((res) => {
        this.users = res;
      }, (err) => {
        console.log(err);
      });
    } else if (this.router.url.includes('client')) {
      this.clientProvider.getListingClientsUsers().subscribe((res) => {
        this.users = res;
      }, (err) => {
        console.log(err);
      });
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(ClientAddUserComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.snackBar.open('Utilisateur ajouté', 'Ok', {duration: 2000});
      }
    });
  }

}
