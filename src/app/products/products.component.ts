import { Component, OnInit } from '@angular/core';
import {AddClientComponent} from '../add-client/add-client.component';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [{
    name: 'John Doe',
    logo: 'http://www.bite.co.nz/images/recipes/Generic_Tomatoes1.jpg?width=1200&height=800&upscale=false',
    price: 34.99,
    origine: 'France',
    code: 'ty56wk7',
    format: 'caisse',
    description: ''
  },
    {
      name: 'John Doe',
      logo: 'http://www.bite.co.nz/images/recipes/Generic_Tomatoes1.jpg?width=1200&height=800&upscale=false',
      price: 34.99,
      origine: 'France',
      code: 'ty56wk7',
      format: 'caisse',
      description: ''
    },
    {
      name: 'Tomate',
      logo: 'http://www.bite.co.nz/images/recipes/Generic_Tomatoes1.jpg?width=1200&height=800&upscale=false',
      price: 34.99,
      origine: 'France',
      code: 'ty56wk7',
      format: 'caisse',
      description: 'Voici une description'
    }];
  productSelect = {};
  editProduct = false;

  constructor(public dialog: MatDialog) {
    this.productSelect = this.products[0];
  }

  ngOnInit() {
  }

  onProductClick(client) {
    this.productSelect = client;
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
