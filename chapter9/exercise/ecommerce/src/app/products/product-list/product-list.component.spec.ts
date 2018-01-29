import { ProductListComponent } from 'app/products/product-list/product-list.component';
import { Product } from 'app/model/product';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ProductItemComponent } from 'app/products/product-item/product-item.component';
import { By } from '@angular/platform-browser';

describe('Product List Component', () => {

    describe('Isolated unit tests', () => {

      it('should create 3 stocks on init', () => {
        const component = new ProductListComponent();
        component.ngOnInit();
        expect(component.products.length).toEqual(3);
      });

      it('should find and update quantity onQuantityChange', () => {
        const component = new ProductListComponent();
        component.ngOnInit();

        assertProducts(component.products, [0, 0, 0]);
        component.onQuantityChange({changeInQuantity: 2, product: getProduct(2)});

        assertProducts(component.products, [0, 2, 0]);

        component.onQuantityChange({changeInQuantity: 2, product: getProduct(2)});
        component.onQuantityChange({changeInQuantity: 1, product: getProduct(1)});
        assertProducts(component.products, [1, 4, 0]);

        component.onQuantityChange({changeInQuantity: -3, product: getProduct(2)});
        assertProducts(component.products, [1, 1, 0]);
      });

      function assertProducts(products, expectedQuantities) {
        expect(products[0].id).toEqual(1);
        expect(products[0].quantityInCart).toEqual(expectedQuantities[0]);
        expect(products[1].id).toEqual(2);
        expect(products[1].quantityInCart).toEqual(expectedQuantities[1]);
        expect(products[2].id).toEqual(3);
        expect(products[2].quantityInCart).toEqual(expectedQuantities[2]);
      }

      function getProduct(id: number) : Product {
        return {
          id: id,
          name: 'Test Product',
          imageUrl: 'Random Image',
          isOnSale: false,
          price: 100,
          quantityInCart: 0
        };
      }
    });

    describe('Angular tests', () => {
      let fixture, component;

        beforeEach(async(() => {
          TestBed.configureTestingModule({
            declarations: [ ProductListComponent, ProductItemComponent ]
          }).compileComponents();
        }));

        beforeEach(() => {
          fixture = TestBed.createComponent(ProductListComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });

        it('should render three product list items', () => {
          const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));
          expect(productItems.length).toEqual(3);
          assertProduct(productItems[0], 'Test Product - 1', 50, 0);
          assertProduct(productItems[1], 'Test Product - 2', 150, 0);
          assertProduct(productItems[2], 'Test Product - 3', 250, 0);
        });

        it('should handle increment item correctly from child product', () => {
          const productItems = fixture.debugElement.queryAll(By.css('app-product-item'));

          assertProduct(productItems[1], 'Test Product - 2', 150, 0);
          const incrementBtnForSecondProduct = productItems[1].query(By.css('button.increment'));
          incrementBtnForSecondProduct.triggerEventHandler('click', null);
          fixture.detectChanges();
          assertProduct(productItems[1], 'Test Product - 2', 150, 1);
          expect(component.products[1].quantityInCart).toEqual(1);

          const decrementBtnForSecondProduct = productItems[1].query(By.css('button.decrement'));
          decrementBtnForSecondProduct.triggerEventHandler('click', null);
          fixture.detectChanges();
          assertProduct(productItems[1], 'Test Product - 2', 150, 0);
          expect(component.products[1].quantityInCart).toEqual(0);
        });

        function assertProduct(element, name, price, qty) {
          const nameEl = element.query(By.css('.name'));
          expect(nameEl.nativeElement.textContent).toEqual(name);
          const priceEl = element.query(By.css('.price'));
          expect(priceEl.nativeElement.textContent).toEqual('$ ' + price);
          const qtyEl = element.query(By.css('.qty'));
          expect(qtyEl.nativeElement.textContent).toEqual(qty + '');
        }
    });
  });
