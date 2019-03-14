import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fournisseur-home',
  templateUrl: './fournisseur-home.component.html',
  styleUrls: ['./fournisseur-home.component.css']
})
export class FournisseurHomeComponent implements OnInit {

  commandes = [
      {
        client: 'Client 1',
        date_commande: '2018-05-11',
        numero_commande: 122,
        produits: [
          {
            nom: 'Produit 1',
            quantite: 4
          },
          {
            nom: 'Produit 2',
            quantite: 6
          }
        ],
        commentaire: 'Voici un commentaire',
        done: false
      },
      {
        client: 'Client 2',
        date_commande: '2018-05-11',
        numero_commande: 121,
        produits: [
          {
            nom: 'Produit 1',
            quantite: 4
          },
          {
            nom: 'Produit 2',
            quantite: 6
          }
        ],
        commentaire: 'Voici un commentaire',
        done: true
      }
    ];

  constructor() { }

  ngOnInit() {
  }

}