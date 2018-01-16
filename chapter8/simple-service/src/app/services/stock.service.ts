import { Injectable } from '@angular/core';
import { Stock } from 'app/model/stock';

@Injectable()
export class StockService {

  private stocks: Stock[];
  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
   }

  getStocks() : Stock[] {
    return this.stocks;
  }

  createStock(stock: Stock) {
    this.stocks.push(stock);
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

}
