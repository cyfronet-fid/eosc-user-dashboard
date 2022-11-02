import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInUserGuardService implements CanActivate {
  constructor(
    private _userProfileService: UserProfileService,
    private _router: Router
  ) {}

  canActivate() {
    return this._userProfileService.user$.pipe(
      tap((user) => console.log(user)),
      switchMap(({ username }) =>
        !username || username === ''
          ? this._router.navigateByUrl('').then(() => false)
          : of(true)
      ),
      tap((bool) => console.log(bool))
    );
  }
}
