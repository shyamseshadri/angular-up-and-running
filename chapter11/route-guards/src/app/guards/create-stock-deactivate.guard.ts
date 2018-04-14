import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
         CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CreateStockComponent } from '../stock/create-stock/create-stock.component';

@Injectable()
export class CreateStockDeactivateGuard
    implements CanDeactivate<CreateStockComponent> {
  canDeactivate(component: CreateStockComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }
}
