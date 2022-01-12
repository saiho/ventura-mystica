import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';

@Injectable()
export class ScoringTilesGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  canActivate() {
    if (this.router.getCurrentNavigation()?.extras?.state?.scoringTilesGuard) {
      return true;
    }
    // Redirect to parent route if this page was loaded manually (with no extra state parameters)
    return this.router.createUrlTree(['..'], { relativeTo: this.route });
  }
}
