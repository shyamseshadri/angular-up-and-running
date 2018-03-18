import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockItemComponent } from './stock-item/stock-item.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';


import { StockRoutingModule } from './stock-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StockRoutingModule
  ],
  declarations: [
    StockDetailsComponent,
    StockItemComponent,
    StockListComponent,
    CreateStockComponent,
  ]
})
export class StockModule { }
