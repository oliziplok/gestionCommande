import { Component, OnInit } from '@angular/core';
import {AddCommandeComponent} from '../add-commande/add-commande.component';
import {ClientAddUserComponent} from '../client-add-user/client-add-user.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './client-utilisateurs.component.html',
  styleUrls: ['./client-utilisateurs.component.css']
})
export class ClientUtilisateursComponent implements OnInit {

  users = [];
  userType = null;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private clientProvider: ClientService,
              private router: Router, private supplierService: SupplierService, private auth: AuthenticationService) {
    this.userType = this.auth.getRole();
  }

  ngOnInit() {
    if (this.router.url.includes('fournisseur')) {
      this.supplierService.getSupplierUsersListing().subscribe((res) => {
        this.users = res;
      }, (err) => {
      });
    } else if (this.router.url.includes('client')) {
      this.clientProvider.getListingClientsUsers().subscribe((res) => {
        this.users = res;
      }, (err) => {
      });
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(ClientAddUserComponent, {
      width: '50%',
      data: {
        userType: this.userType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Utilisateur ajouté', 'Ok', {duration: 2000});
      }
    });
  }

  onDeleteUser(user) {
    if (this.userType === 'client') {
      this.clientProvider.deleteUser(user.id);
    } else {
      this.supplierService.deleteUser(user.id);
    }
  }

  updatePassWord(userToEdit) {
    const dialogRef = this.dialog.open(ClientAddUserComponent, {
      width: '50%',
      data: {
        user: userToEdit,
        userType: this.userType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Utilisateur ajouté', 'Ok', {duration: 2000});
      }
    });
  }

}
