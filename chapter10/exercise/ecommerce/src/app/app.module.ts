import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductListComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
