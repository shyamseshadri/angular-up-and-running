import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockService } from 'app/services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StockService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
