import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot }
    from '@angular/router';
import { CreateStockComponent } from '../stock/create-stock/create-stock.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateStockDeactivateGuardService
    implements CanDeactivate<CreateStockComponent> {

  constructor() { }

  canDeactivate(component: CreateStockComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
                   boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }

}
