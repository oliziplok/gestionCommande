import { Component, OnInit } from '@angular/core';
import {AddClientComponent} from '../../fournisseur-layout/components/add-client/add-client.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddCommandeComponent} from '../add-commande/add-commande.component';
import {ClientService} from '../../../services/client/client.service';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  commandes = [
    // {
    //   client: 'Client 1',
    //   date_commande: '2018-05-11',
    //   numero_commande: 122,
    //   produits: [
    //     {
    //       nom: 'Produit 1',
    //       quantite: 4
    //     },
    //     {
    //       nom: 'Produit 2',
    //       quantite: 6
    //     }
    //   ],
    //   commentaire: 'Voici un commentaire'
    // },
    // {
    //   client: 'Client 2',
    //   date_commande: '2018-05-11',
    //   numero_commande: 121,
    //   produits: [
    //     {
    //       nom: 'Produit 1',
    //       quantite: 4
    //     },
    //     {
    //       nom: 'Produit 2',
    //       quantite: 6
    //     }
    //   ],
    //   commentaire: 'Voici un commentaire'
    // }
  ];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private clientProvider: ClientService,
              private supplierService: SupplierService, private http: HttpClient) { }

  ngOnInit() {
    this.clientProvider.getClientOrdersListing().subscribe((res) => {
      this.commandes = res;
    }, (err) => {
    });
  }

  addCommande() {
    const dialogRef = this.dialog.open(AddCommandeComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Commande bien passée', 'Ok', {duration: 2000});
      }
    });
  }

  editOrder(commande) {
    this.supplierService.editOrder(commande);
  }

  print(commande) {
    this.http.get('https://gestiondecommandes.langoni.ca/api/order/' + commande.id + '/print/0').subscribe(
      (res) => {
      }
    );
    // window.open('https://gestiondecommandes.langoni.ca/api/order/' + commande.id + '/print', '_blank');
  }
}
