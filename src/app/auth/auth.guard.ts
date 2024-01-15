// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAccess(state.url);
  }

  private checkAccess(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert('You need to log in to access this page.');
      this.authService.redirectUrl = url;
      return this.router.parseUrl('/login');
    }
  }
}
