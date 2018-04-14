import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { StockService } from 'app/services/stock.service';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { AppRoutesModule } from './app-routes.module';
import { CreateStockDeactivateGuard } from './guards/create-stock-deactivate.guard';
import { AuthGuard } from './guards/auth.guard';
import { StockLoadResolverService } from './resolver/stock-load-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent,
    StockDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule,
  ],
  providers: [
    StockService,
    UserService,
    UserStoreService,
    AuthGuard,
    CreateStockDeactivateGuard,
    StockLoadResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockAppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
