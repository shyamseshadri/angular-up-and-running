import { TestBed, async } from '@angular/core/testing';

import { StockItemComponent } from './stock-item.component';
import { Stock } from '../../model/stock';
import { By } from '@angular/platform-browser';

describe('Stock Item Component', () => {

  let fixture, component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockItemComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemComponent);
    component = fixture.componentInstance;
    component.stock = new Stock('Testing Stock', 'TS', 100, 200, 'NYSE');
    fixture.detectChanges();
  });

  it('should create stock component and render stock data', () => {
    const nameEl = fixture.debugElement.query(By.css('.name'));
    expect(nameEl.nativeElement.textContent).toEqual('Testing Stock (TS)');
    const priceEl = fixture.debugElement.query(By.css('.price.negative'));
    expect(priceEl.nativeElement.textContent).toEqual('$ 100');
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
    expect(addToFavoriteBtnEl).toBeDefined();
  });

  it('should trigger event emitter on add to favorite', () => {
    let selectedStock: Stock;
    component.toggleFavorite.subscribe((stock: Stock) => selectedStock = stock);
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));

    expect(selectedStock).toBeUndefined();
    addToFavoriteBtnEl.triggerEventHandler('click', null);
    expect(selectedStock).toEqual(component.stock);
  });
});
