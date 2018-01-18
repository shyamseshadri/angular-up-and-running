import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductQuantityChange } from 'app/model/product-quantity-change';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <app-product-item [product]="product"
                      (quantityChange)="onQuantityChange($event)"
                      *ngFor="let product of products$ | async"></app-product-item>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  onQuantityChange(change: ProductQuantityChange) {
    this.productService.changeQuantity(change.product.id, change.changeInQuantity);
  }
}
