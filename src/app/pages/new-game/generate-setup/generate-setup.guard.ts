import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GenerateSetupGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Be sure that the options were validated before generating the setup
    if (this.router.getCurrentNavigation()?.extras?.state?.validated) {
      return true;
    }
    // Redirect to parent route if this page was loaded manually (with no extra state parameters)
    return this.router.createUrlTree(['..'], { relativeTo: this.route });
  }
}
