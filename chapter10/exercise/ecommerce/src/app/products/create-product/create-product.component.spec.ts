import { async, TestBed, inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController }
    from '@angular/common/http/testing';

import { CreateProductComponent } from 'app/products/create-product/create-product.component';
import { Product } from 'app/model/product';
import { ProductService } from 'app/services/product.service';

describe('Create Product Component', () => {

  let fixture, component, httpBackend, product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductComponent ],
      providers: [ProductService],
      imports: [ HttpClientModule, HttpClientTestingModule, FormsModule ]
    }).compileComponents();
  }));

  beforeEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    httpBackend = backend;
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    product = {
      name: 'Test Product',
      imageUrl: 'http://www.google.com',
      price: 80,
      isOnSale: false
    };
    fixture.detectChanges();
  }));

  it('should create products successfully', async(() => {
    component.createProduct({valid: true, value: {product: product}});
    let httpReq = httpBackend.expectOne({method: 'POST', url: '/api/product'}, 'Create Product');
    expect(httpReq.request.body).toEqual(product);
    httpReq.flush({msg: 'Success!!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let messageEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(messageEl.textContent).toEqual('Product successfully created.');
    });
  }));

  it('should handle create products failure', async(() => {
    component.createProduct({valid: true, value: {product: product}});
    let httpReq = httpBackend.expectOne({method: 'POST', url: '/api/product'}, 'Create Product');
    expect(httpReq.request.body).toEqual(product);
    httpReq.flush({msg: 'Failed!!!!'}, {status: 400, statusText: 'Failed!!!'});

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let messageEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(messageEl.textContent).toEqual('Unable to create product, please try again.');
    });
  }));

});
