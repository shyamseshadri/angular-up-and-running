import { Component } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public message = '';
  constructor(private productService: ProductService) { }

  createProduct(productForm) {
    if (productForm.invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const product: Product = productForm.value.product;
      this.productService.createProduct(product)
    }
  }

}
