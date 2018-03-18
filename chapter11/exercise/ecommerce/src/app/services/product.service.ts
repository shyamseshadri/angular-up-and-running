import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from 'app/model/product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  getProducts(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/product', {
      params: {q: query}
    });
  }

  changeQuantity(id: number, changeInQuantity: number): Observable<any> {
    return this.httpClient.patch('/api/product/' + id, {changeInQuantity: changeInQuantity});
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>('/api/product', product);
  }
}
