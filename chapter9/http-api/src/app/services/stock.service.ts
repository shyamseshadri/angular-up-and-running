import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Stock } from 'app/model/stock';
import { HttpEvent } from '@angular/common/http/src/response';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {}

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stock', {
      headers: new HttpHeaders()
          .set('Authorization', 'MyAuthorizationHeaderValue')
          .set('X-EXAMPLE-HEADER', 'TestValue'),
      params: {
        q: 'test',
        test: 'value'
      },
      observe: 'body'
    });
  }

  getStocksAsResponse(): Observable<HttpResponse<Stock[]>> {
    return this.http.get<Stock[]>('/api/stock', {
      observe: 'response'
    });
  }

  getStocksAsEvents(): Observable<HttpEvent<any>> {
    return this.http.get('/api/stock', {
      observe: 'events'
    });
  }

  getStocksAsString(): Observable<string> {
    return this.http.get('/api/stock', {
      responseType: 'text'
    });
  }

  getStocksAsBlob(): Observable<Blob> {
    return this.http.get('/api/stock', {
      responseType: 'blob'
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
