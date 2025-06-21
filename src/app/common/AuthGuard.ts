import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { GlobalConstants } from './global-constants'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // si sso disabled
    if (!GlobalConstants.enableSSO) {
      return true
    }

    // sinon check token
    const token = GlobalConstants.getAccessToken()
    if (token) {
      return true
    } else {
      this.router.navigateByUrl('/sso')
      return false
    }
  }
}
