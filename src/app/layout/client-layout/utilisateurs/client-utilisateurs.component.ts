import { Component, OnInit } from '@angular/core';
import {AddCommandeComponent} from '../add-commande/add-commande.component';
import {ClientAddUserComponent} from '../client-add-user/client-add-user.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './client-utilisateurs.component.html',
  styleUrls: ['./client-utilisateurs.component.css']
})
export class ClientUtilisateursComponent implements OnInit {

  users = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private clientProvider: ClientService) { }

  ngOnInit() {
    this.clientProvider.getClientUser().subscribe((res) => {
      this.users = res;
    }, (err) => {
      console.log(err);
    });
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
