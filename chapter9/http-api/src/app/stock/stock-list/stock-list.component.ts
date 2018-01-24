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

  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stocks$ = this.stockService.getStocks();
    this.stockService.getStocksAsResponse()
        .subscribe((response) => {
          console.log('OBSERVE "response" RESPONSE is ', response);
        });

    this.stockService.getStocksAsEvents()
        .subscribe((response) => {
          console.log('OBSERVE "events" RESPONSE is ', response);
        });

    this.stockService.getStocksAsString()
        .subscribe((response) => {
          console.log('Response Type "text" RESPONSE is ', response);
        });

    this.stockService.getStocksAsBlob()
        .subscribe((response) => {
          console.log('Response Type "blob" RESPONSE is ', response);
        });
  }
}
