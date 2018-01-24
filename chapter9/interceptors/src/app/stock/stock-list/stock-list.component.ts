import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService,
              private authService: AuthService) { }

  ngOnInit() {
    this.fetchStocks();
  }

  fetchStocks() {
    this.stocks$ = this.stockService.getStocks();
  }

  setAuthToken() {
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    this.authService.authToken = null;
  }

  makeFailingCall() {
    this.stockService.makeFailingCall().subscribe(
      (res) => console.log('Successfully made failing call', res),
      (err) => console.error('Error making failing call', err));
  }
}
