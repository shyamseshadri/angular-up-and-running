import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CreateStockDeactivateGuardService } from './services/create-stock-deactivate-guard.service';
import { StockLoadResolverService } from './services/stock-load-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'stock', loadChildren: 'app/stock/stock.module#StockModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: '**', redirectTo: 'user/register' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutesModule { }
