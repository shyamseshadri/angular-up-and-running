import { TestBed, inject } from '@angular/core/testing';

import { StockService } from './stock.service';
import { Stock } from 'app/model/stock';

describe('StockService', () => {
  var stockService: StockService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService]
    });
  });

  beforeEach(inject([StockService],
    (service: StockService) => {
      stockService = service;
  }));

  it('should allow adding stocks', () => {
    expect(stockService.getStocks().length).toEqual(3);
    let stock = new Stock('Testing A New Company', 'TTT',
        850, 800, 'NASDAQ');
    expect(stockService.createStock(stock)).toBeTruthy();
    expect(stockService.getStocks().length).toEqual(4);
    expect(stockService.getStocks()[3].code).toEqual('TTT')
  });

  it('should fetch a list of stocks', () => {
    expect(stockService.getStocks().length).toEqual(3);
    expect(stockService.getStocks()[0].code).toEqual('TSC');
    expect(stockService.getStocks()[1].code).toEqual('SSC');
    expect(stockService.getStocks()[2].code).toEqual('LSC');
  });
});
