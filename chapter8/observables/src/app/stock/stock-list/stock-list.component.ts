import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  //public stocks: Stock[];
  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    /**this.stockService.getStocks()
        .subscribe(stocks => {
          this.stocks = stocks;
    });*/
    this.stocks$ = this.stockService.getStocks();
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stockService.toggleFavorite(stock);
  }
}
