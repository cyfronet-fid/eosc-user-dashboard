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
            going: string;
            interested: string;
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
        catchError(
          () =>
            of([
              {
                title:
                  'Blue-Cloud Final Conference - Unlocking Open Science in support of the EU Green Deal',
                body: '',
                path: '/events/blue-cloud-final-conference-unlocking-open-science-support-eu-green-deal',
                date: 'Thursday, December 8, 2022 - 10:00 to 18:00',
                image:
                  'https://eosc-portal.eu/sites/default/files/blue-cloud-final-conference-eosc.png',
                going: '0',
                interested: '',
              },
              {
                title:
                  '1Blue-Cloud Final Conference - Unlocking Open Science in support of the EU Green Deal',
                body: '',
                path: '/events/blue-cloud-final-conference-unlocking-open-science-support-eu-green-deal',
                date: 'Thursday, December 8, 2022 - 10:00 to 18:00',
                image:
                  'https://eosc-portal.eu/sites/default/files/blue-cloud-final-conference-eosc.png',
                going: '0',
                interested: '',
              },
              {
                title:
                  '2Blue-Cloud Final Conference - Unlocking Open Science in support of the EU Green Deal',
                body: '',
                path: '/events/blue-cloud-final-conference-unlocking-open-science-support-eu-green-deal',
                date: 'Thursday, December 8, 2022 - 10:00 to 18:00',
                image:
                  'https:///eosc-portal.eu/sites/default/files/livestream.PNG',
                going: '0',
                interested: '',
              },
            ])
          //of([{ title: '', body: '', path: '', date: '', image: '', going: '', interested: '' }])
        ),
        tap((event) => console.log(event)),
        tap((event) => this._store$.update(() => ({ events: event })))
      );
  }

  currentDate() {
    return new Date();
  }
}
