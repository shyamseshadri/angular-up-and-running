import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { debounceTime, switchMap,
         distinctUntilChanged, startWith,
         share } from 'rxjs/operators';

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
    this.stocks$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.stockService.getStocks(query)),
      share()
    );
  }

  search() {
    // this.stocks$ = this.stockService.getStocks(this.searchString);
    this.searchTerms.next(this.searchString);
  }
}
