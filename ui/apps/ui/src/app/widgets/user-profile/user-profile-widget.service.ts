import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { UserProfileWidget } from './user-profile-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class UserProfileWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'user-profile-widget',
    },
    withProps<{ user: UserProfileWidget | null }>({ user: null })
  );

  readonly user$: Observable<UserProfileWidget> = this._store$.pipe(
    select((state) => state.user as UserProfileWidget),
    filter((user) => user !== null)
  );

  get$(): Observable<UserProfileWidget> {
    return this._http
      .get<{
        username: string;
        favourites: number;
        imgsrc: string;
        edit: string;
        jwttoken: string;
      }>(`${environment.backendApiPath}/${environment.userApiPath}`)
      .pipe(
        catchError(() =>
          of({
            username: '',
            aaiId: null,
            favourites: 0,
            imgsrc: '',
            edit: '',
            jwttoken: '',
          })
        ),
        tap((user) => this._store$.update(() => ({ user: user })))
      );
  }
}
