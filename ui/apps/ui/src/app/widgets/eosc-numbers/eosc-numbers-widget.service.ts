import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { EOSCNumbersWidget } from './eosc-numbers-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class EOSCNumbersWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'eosc-numbers-widget',
    },
    withProps<{ numbers: EOSCNumbersWidget | null }>({
      numbers: {
        services: 0,
        publications: 0,
        trainings: 0,
        softwares: 0,
        data: 0,
        datasources: 0,
      },
    })
  );

  readonly numbers$: Observable<EOSCNumbersWidget> = this._store$.pipe(
    select((state) => state.numbers as EOSCNumbersWidget),
    filter((numbers) => numbers !== null)
  );

  get$(): Observable<EOSCNumbersWidget> {
    return this._http
      .get<{
        services: number;
        publications: number;
        trainings: number;
        softwares: number;
        data: number;
        datasources: number;
      }>(`${environment.backendApiPath}/${environment.numbersApi}/dash`)
      .pipe(
        catchError(() =>
          of({
            services: 0,
            publications: 0,
            trainings: 0,
            softwares: 0,
            data: 0,
            datasources: 0,
          })
        ),
        tap((numbers) => this._store$.update(() => ({ numbers: numbers })))
      );
  }
}
