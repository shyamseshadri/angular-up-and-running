import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockComponent } from './create-stock.component';
import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('CreateStockComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockComponent ],
      providers: [ StockService ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create stock through service', async(() => {
    expect(component).toBeTruthy();
    component.stock = new Stock(
      'My New Test Stock', 'MNTS', 100, 120, 'NYSE');

    component.createStock({valid: true});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.message)
          .toEqual('Stock with code MNTS successfully created');
      const messageEl = fixture.debugElement.query(
          By.css('.message')).nativeElement;
      expect(messageEl.textContent)
          .toBe('Stock with code MNTS successfully created');
    });
  }));
});
