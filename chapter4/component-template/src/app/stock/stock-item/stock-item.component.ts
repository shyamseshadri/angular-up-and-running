import { Component, OnInit } from '@angular/core';

import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  template: `
    <div class="stock-container">
      <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
      <div class="price"
          [class]="stock.isPositiveChange() ? 'positive' : 'negative'">$ {{stock.price}}</div>
      <button (click)="toggleFavorite($event)"
              *ngIf="!stock.favorite">Add to Favorite</button>
    </div>
  `,
  styleUrls: ['./stock-item.component.css' ]
})
export class StockItemComponent implements OnInit {

  public stock: Stock;

  constructor() { }

  ngOnInit() {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  toggleFavorite(event) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stock.favorite = !this.stock.favorite;
  }

}
