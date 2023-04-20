import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAnonymousUserGuardService implements CanActivate {
  constructor(
    private _userProfileService: UserProfileService,
    private _router: Router
  ) {}

  canActivate() {
    return this._userProfileService.user$.pipe(
      switchMap(({ username }) =>
        !!username && username !== ''
          ? this._router.navigateByUrl('dashboard').then(() => false)
          : of(true)
      )
    );
  }
}
