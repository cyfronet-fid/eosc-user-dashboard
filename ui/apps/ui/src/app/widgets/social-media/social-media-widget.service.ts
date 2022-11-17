import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { SocialMediaWidget } from './social-media-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'social-media-widget',
    },
    withProps<{ social: SocialMediaWidget | null }>({
      social: { tweetid: 'EoscPortal' },
    })
  );

  readonly social$: Observable<SocialMediaWidget> = this._store$.pipe(
    select((state) => state.social as SocialMediaWidget),
    filter((social) => social !== null)
  );

  get$(): Observable<SocialMediaWidget> {
    return this._http
      .get<{
        tweetid: string;
      }>(`${environment.backendApiPath}/${environment.userApiPath}`)
      .pipe(
        catchError(() => of({ tweetid: 'EoscPortal' })),
        tap((social) => this._store$.update(() => ({ social: social })))
      );
  }
}
