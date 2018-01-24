import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  public searchString: string = '';

  private searchTerms: Subject<string> = new Subject();
  constructor(private stockService: StockService) { }

  ngOnInit() {
    // this.stocks$ = this.stockService.getStocks(this.searchString);
    this.stocks$ = this.searchTerms
      .startWith(this.searchString)
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query) => this.stockService.getStocks(query))
      .share();
  }

  search() {
    // this.stocks$ = this.stockService.getStocks(this.searchString);
    this.searchTerms.next(this.searchString);
  }
}
