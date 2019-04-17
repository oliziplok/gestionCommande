import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  showLoader = false;
  addProductForm: FormGroup;

  constructor(formBuilder: FormBuilder, private supplierService: SupplierService,
              private dialogRef: MatDialogRef<AddProductComponent>) {
    this.addProductForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      origine: ['', Validators.compose([Validators.required])],
      code: ['', Validators.compose([Validators.required])],
      format: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      logo: ['']
    });
  }

  ngOnInit() {
  }

  onFileInput(imageInput) {
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      console.log(event);
      const selectedFile = {
        src: event.target.result,
        file: file
      };
      this.addProductForm.controls.logo.setValue(selectedFile.src);
    });

    reader.readAsDataURL(file);
  }

  deleteImage() {
    this.addProductForm.controls.logo.setValue('');
  }

  onAdd() {
    this.showLoader = true;
    this.supplierService.addProduct(this.addProductForm.value).then(() => {
      this.showLoader = false;
      this.dialogRef.close();
    }).catch((err) => {
      this.showLoader = false;
      console.log(err);
    });
  }
}
