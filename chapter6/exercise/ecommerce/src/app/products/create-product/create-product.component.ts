import { Component } from '@angular/core';
import { Product } from 'app/model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public message = '';
  constructor() { }

  createProduct(productForm) {
    if (productForm.invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const product: Product = productForm.value.product;
      console.log('Creating product', product);
    }
  }

}
