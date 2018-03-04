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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stocks/list', component: StockListComponent,
    canActivate: [AuthGuardService] },
  { path: 'stocks/create', component: CreateStockComponent,
    canActivate: [AuthGuardService], canDeactivate: [CreateStockDeactivateGuardService] },
  { path: 'stock/:code', component: StockDetailsComponent,
    canActivate: [AuthGuardService], resolve: { stock: StockLoadResolverService } },
  { path: '**', redirectTo: '/register' }
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
