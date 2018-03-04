import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { Observable } from 'rxjs/Observable';
import { UserStoreService } from '../../services/user-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService,
              private userStore: UserStoreService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Page No. : ',
        this.route.snapshot.queryParamMap.get('page'));
    this.stocks$ = this.stockService.getStocks();
  }
}
