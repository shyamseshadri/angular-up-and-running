import { Component, OnInit, Input } from '@angular/core';

import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent {

  @Input() public stock: Stock;

  constructor() { }

  toggleFavorite(event) {
    this.stock.favorite = !this.stock.favorite;
  }
}
