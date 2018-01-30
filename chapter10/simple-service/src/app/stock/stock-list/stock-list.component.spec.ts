import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListComponent } from './stock-list.component';
import { StockService } from 'app/services/stock.service';
import { StockItemComponent } from 'app/stock/stock-item/stock-item.component';
import { Stock } from 'app/model/stock';

describe('StockListComponent With Real Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      providers: [ StockService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from real service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(3);
  });
});

describe('StockListComponent With Mock Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      providers: [ StockService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    // Always get the Service from the Injector!
    stockService = fixture.debugElement.injector.get(StockService);
    let spy = spyOn(stockService, 'getStocks')
        .and.returnValue([new Stock('Mock Stock', 'MS', 800, 900, 'NYSE')])
    fixture.detectChanges();
  });

  it('should load stocks from mocked service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual('MS');
  });
});


describe('StockListComponent With Fake Service', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    let stockServiceFake = {
      getStocks: () => {
        return [new Stock('Fake Stock', 'FS', 800, 900, 'NYSE')];
      }
    };
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockItemComponent ],
      providers: [ {
        provide: StockService,
        useValue: stockServiceFake
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load stocks from fake service on init', () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual('FS');
  });
});
