import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { UpcomingEventsWidget } from './upcoming-events-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class UserProfileWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'upcoming-events-widget',
    },
    withProps<{ events: UpcomingEventsWidget | null }>({ events: null })
  );

  readonly events$: Observable<UpcomingEventsWidget> = this._store$.pipe(
    select((state) => state.events as UpcomingEventsWidget),
    filter((user) => user !== null)
  );

  get$(): Observable<UpcomingEventsWidget> {
    return this._http
      .get<{
        headline: string;
        dateplace: string;
        imgsrc: string;
        going: number;
      }>(`${environment.backendApiPath}/${environment.userApiPath}`)
      .pipe(
        catchError(() =>
          of({ headline: '', dateplace: '', imgsrc: '', going: 0 })
        ),
        tap((events) => this._store$.update(() => ({ events: events })))
      );
  }
}
