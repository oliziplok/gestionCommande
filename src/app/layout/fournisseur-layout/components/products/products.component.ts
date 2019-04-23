import { Component, OnInit } from '@angular/core';
import {AddClientComponent} from '../add-client/add-client.component';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {ErrorPrompService} from '../../../../services/errorPromp/error-promp.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  productSelect = {};
  editProduct = false;

  constructor(public dialog: MatDialog, public productService: SupplierService, private errorPrompt: ErrorPrompService) {
    // this.productSelect = this.products[0];
  }

  ngOnInit() {
    this.productService.getSupplierProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
      this.productSelect = this.products[0];
    }, (err) => {
      console.log(err);
    });
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

  onProductDelete() {
    this.productService.deleteProduct(this.productSelect);
    this.editProduct = false;
  }

  onEdit() {
    this.productService.editProduct(this.productSelect).catch((err) => {
      this.errorPrompt.openError(err.statusText);
    });
    this.editProduct = false;
  }

}
