import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {SupplierService} from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-liste-produits-client',
  templateUrl: './liste-produits-client.component.html',
  styleUrls: ['./liste-produits-client.component.css']
})
export class ListeProduitsClientComponent implements OnInit {

  products = [];
  productSelect = {};
  editProduct = false;

  constructor(public dialog: MatDialog, public productService: SupplierService) {
    // this.productSelect = this.products[0];
  }

  ngOnInit() {
    this.productService.getSupplierProducts().subscribe((res) => {
      this.products = res;
      this.productSelect = this.products[0];
    }, (err) => {
    });
  }

  onProductClick(client) {
    this.productSelect = client;
  }
}
