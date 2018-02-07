import { async, ComponentFixture, TestBed, inject }
    from '@angular/core/testing';

import { StockService } from 'app/services/stock.service';
import { Stock } from 'app/model/stock';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController }
    from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateStockComponent }
    from 'app/stock/create-stock/create-stock.component';
import { FormsModule } from '@angular/forms';

describe('CreateStockComponent With Real Service', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;
  let httpBackend: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockComponent ],
      providers: [ StockService ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([HttpTestingController],
      (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should make call to create stock and handle failure',
      async(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();

    component.stock = {
      name: 'Test Stock',
      price: 200,
      previousPrice: 500,
      code: 'TSS',
      exchange: 'NYSE',
      favorite: false
    };

    component.createStock({valid: true});

    let httpReq = httpBackend.expectOne({
      url: '/api/stock',
      method: 'POST'
    }, 'Create Stock with Failure');
    expect(httpReq.request.body).toEqual(component.stock);
    httpReq.flush({msg: 'Stock already exists.'},
        {status: 400, statusText: 'Failed!!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(
          By.css('.message')).nativeElement;
      expect(messageEl.textContent).toEqual('Stock already exists.');
    });
  }));

  afterEach(() => {
    httpBackend.verify();
  });
});
