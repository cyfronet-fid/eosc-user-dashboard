import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { UpcomingEventsWidget } from './upcoming-events-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UpcomingEventsWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'upcoming-events-widget',
    },
    withProps<{ events: UpcomingEventsWidget[] }>({ events: [] })
  );

  readonly events$: Observable<UpcomingEventsWidget[]> = this._store$.pipe(
    select((state) => state.events as UpcomingEventsWidget[]),
    filter((event) => event !== null)
  );

  get$(): Observable<UpcomingEventsWidget[]> {
    return this._http
      .get<
        [
          {
            title: string;
            body: string;
            path: string;
            date: string;
            image: string;
          }
        ]
      >(
        `${environment.backendApiPath}/${environment.upcomingEventsApiPath}/${
          new Date(
            this.currentDate().setMonth(this.currentDate().getMonth() - 2)
          )
            .toISOString()
            .split('T')[0]
        }--${
          new Date(
            this.currentDate().setMonth(this.currentDate().getMonth() + 2)
          )
            .toISOString()
            .split('T')[0]
        }`
      )
      .pipe(
        catchError(() =>
          of([{ title: '', body: '', path: '', date: '', image: '' }])
        ),
        tap((event) => console.log(event)),
        tap((event) => this._store$.update(() => ({ events: event })))
      );
  }

  currentDate() {
    return new Date();
  }
}
