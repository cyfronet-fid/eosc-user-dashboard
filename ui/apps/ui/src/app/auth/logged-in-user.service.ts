import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUser implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this._authService
      .getUserInfo$()
      .toPromise()
      .catch(() => false);
    if (!isLoggedIn) {
      await this._router.navigateByUrl('');
      return false;
    }

    return true;
  }
}
