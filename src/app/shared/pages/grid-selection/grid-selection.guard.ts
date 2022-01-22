import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GridSelectionData } from './grid-selection.page';

@Injectable()
export class GridSelectionGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const data = route.data as GridSelectionData<any, any>;
    const bindComponent = this.injector.get(data.bindComponentType);
    if (data.getSelectedItems(bindComponent) instanceof Array) {
      return true;
    }
    // Redirect to parent route if this page was loaded manually (with no extra state parameters)
    return this.router.createUrlTree(['..'], { relativeTo: this.route });
  }
}
