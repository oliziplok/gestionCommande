import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddClientComponent} from '../add-client/add-client.component';
import {ClientService} from '../../../../services/client/client.service';
import {SupplierService} from '../../../../services/supplier/supplier.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // clients = [{
  //   name: 'John Doe',
  //   company: 'Compagnie 1',
  //   email: 'test@test.com',
  //   buy_condition: '40 jours',
  //   rec_adress: '1234 rue de la poule',
  //   ship_adress: '1235 rue de la poule',
  //   logo: 'https://az826390.vo.msecnd.net/cdn/media/data/default/new-product-large.ashx',
  //   nb_commande: 3
  // },
  //   {
  //     name: 'Paula Berger',
  //     company: 'Compagnie 2',
  //     email: 'popo@test.com',
  //     buy_condition: '10 jours',
  //     rec_adress: '1234 rue de la poule',
  //     ship_adress: '1235 rue de la poule',
  //     logo: 'https://az826390.vo.msecnd.net/cdn/media/data/default/new-product-large.ashx',
  //     nb_commande: 2
  //   },
  //   {
  //     name: 'Paul Simon',
  //     company: 'Compagnie 3',
  //     email: 'allo@test.com',
  //     buy_condition: '20 jours',
  //     rec_adress: '1234 rue de la carotte',
  //     ship_adress: '1235 rue de la carotte',
  //     logo: 'https://az826390.vo.msecnd.net/cdn/media/data/default/new-product-large.ashx',
  //     nb_commande: 5
  //   }];
  clients;
  clientSelect = {};
  editClient:boolean = false;

  constructor(public dialog: MatDialog, public supplierService: SupplierService) {
    // this.clientSelect = this.clients[0];
  }

  ngOnInit() {
    this.supplierService.getSupplierClientsListing().then((res) => {
      console.log(res);
      this.clients = [];
      for (const client of res) {
        this.clients.push(client[0]);
      }
      this.clientSelect = this.clients[0];
    }).catch((err) => {
      console.log(err);
    });
  }

  onClientClick(client) {
    this.clientSelect = client;
  }

  addUser() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
