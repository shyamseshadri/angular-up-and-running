import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Stock } from 'app/model/stock';
import { HttpEvent } from '@angular/common/http/src/response';
import { UserStoreService } from './user-store.service';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class StockService {

  private baseUrl: string;

  constructor(private http: HttpClient,
              private userStore: UserStoreService,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    console.log('APP BASE HREF', origin);
    this.baseUrl = `${origin}/api/stock`;
  }

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }

  getStock(code: string): Observable<Stock> {
    return this.http.get<Stock>(this.baseUrl + code);
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post(this.baseUrl, stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>(this.baseUrl + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}
