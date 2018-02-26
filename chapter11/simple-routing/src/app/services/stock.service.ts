import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Stock } from 'app/model/stock';
import { HttpEvent } from '@angular/common/http/src/response';
import { UserStoreService } from './user-store.service';

@Injectable()
export class StockService {

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stock', {
      headers: {
        "X-AUTH-HEADER": this.userStore.token || 'TEST'
      }
    });
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post('/api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>('/api/stock/' + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}
