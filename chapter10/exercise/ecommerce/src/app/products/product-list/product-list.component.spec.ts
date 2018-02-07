import { async, TestBed, inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController }
    from '@angular/common/http/testing';

import { ProductListComponent } from 'app/products/product-list/product-list.component';
import { ProductItemComponent } from 'app/products/product-item/product-item.component';
import { Product } from 'app/model/product';
import { ProductService } from 'app/services/product.service';

describe('Product List Component', () => {

  let fixture, component, httpBackend, stocks;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent, ProductItemComponent ],
      providers: [ProductService],
      imports: [ HttpClientModule, HttpClientTestingModule, FormsModule ]
    }).compileComponents();
  }));

  beforeEach(async(inject([HttpTestingController], (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    stocks = [{
      id: 1,
      name: 'Test Product - 1',
      imageUrl: '',
      price: 50,
      isOnSale: true,
      quantityInCart: 0
    }, {
      id: 2,
      name: 'Test Product - 2',
      imageUrl: '',
      price: 150,
      isOnSale: true,
      quantityInCart: 0
    }];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      httpBackend.expectOne('/api/product?q=', 'Get list of products')
          .flush(stocks);
    });

  })));

  it('should render three product list items', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
      expect(productItems.length).toEqual(2);
      assertProduct(productItems[0], 'Test Product - 1', 50, 0);
      assertProduct(productItems[1], 'Test Product - 2', 150, 0);
    });
  }));

  it('should handle increment item correctly and reload all products', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let productItems = fixture.debugElement.queryAll(By.css('app-product-item'));

      assertProduct(productItems[1], 'Test Product - 2', 150, 0);
      const incrementBtnForSecondProduct = productItems[1].query(By.css('button.increment'));
      incrementBtnForSecondProduct.triggerEventHandler('click', null);
      fixture.detectChanges();

      let httpReq = httpBackend.expectOne({method: 'PATCH', url: '/api/product/2'});
      expect(httpReq.request.body).toEqual({changeInQuantity: 1});
      httpReq.flush({msg: 'Success'});

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        httpBackend.expectOne('/api/product?q=', 'Get list of products')
          .flush([{
            id: 1,
            name: 'Test Product - 1',
            imageUrl: '',
            price: 50,
            isOnSale: true,
            quantityInCart: 0
          }, {
            id: 2,
            name: 'Test Product - 2',
            imageUrl: '',
            price: 150,
            isOnSale: true,
            quantityInCart: 5
          }]);
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
          expect(productItems.length).toEqual(2);
          assertProduct(productItems[1], 'Test Product - 2', 150, 5);
        });
      });

    });
  }));

  function assertProduct(element, name, price, qty) {
    const nameEl = element.query(By.css('.name'));
    expect(nameEl.nativeElement.textContent).toEqual(name);
    const priceEl = element.query(By.css('.price'));
    expect(priceEl.nativeElement.textContent).toEqual('$ ' + price);
    const qtyEl = element.query(By.css('.qty'));
    expect(qtyEl.nativeElement.textContent).toEqual(qty + '');
  }
});
