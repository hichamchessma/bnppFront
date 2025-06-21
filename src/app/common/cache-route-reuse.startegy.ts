import { RouteReuseStrategy } from '@angular/router'
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router'

export class CacheRouteReuseStrategy implements RouteReuseStrategy {

  storedRouteHandles: any
  allowRetrieveCache: any

  constructor() {
    // les routes à "cache", pour éviter les rafraichissements trop longs
    this.allowRetrieveCache = {
      'rights': true,
      'requests': true,
      'habilitations': true,
      'identities': true,
      'kpi': true,
      'kpi-requests': true,
      'rights-extraction': true
    }

    this.storedRouteHandles = new Map<string, DetachedRouteHandle>()
  }

  shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    Object.keys(this.allowRetrieveCache).forEach((e) => {
      if (this.getPath(before) === e) {
        this.allowRetrieveCache[e] = true;
      } else {
        this.allowRetrieveCache[e] = false;
      }
    })
    return before.routeConfig === curr.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route)
    if (this.allowRetrieveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }
    return false;
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetrieveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path || '';
    }
    return '';
  }
}

