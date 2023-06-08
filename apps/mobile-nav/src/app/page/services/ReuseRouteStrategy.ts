import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * For performance reason, Angular does not create new instance of a component
 * if only a path variable is change.
 *
 * Say you have something like this
 *
 * ```
 *  {
 *     path: ':id',
 *     loadChildren: () => import('./finder.module').then(m => m.FinderModule)
 *  }
 * ```
 *
 * Add ReuseRouteStrategy to your `app.module.ts` to override angular's default
 * behavior.
 *
 * ```
 *  providers: [
 *     { provide: RouteReuseStrategy, useClass: ReuseRouteStrategy }
 *   ],
 * ```
 */
export class ReuseRouteStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    // do nothing
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;  // always create a new instance of the component
  }
}
