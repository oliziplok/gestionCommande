import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
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
}
