import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnonymousUser implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this._authService
      .getUserInfo$()
      .toPromise()
      .catch(() => false);
    if (isLoggedIn) {
      await this._router.navigateByUrl('dashboard');
      return false;
    }

    return true;
  }
}
