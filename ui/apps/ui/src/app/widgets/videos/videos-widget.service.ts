import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { VideosWidget } from './videos-widget.types';
import { createStore, select, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class VideoWidgetService {
  constructor(private _http: HttpClient) {}

  readonly _store$ = createStore(
    {
      name: 'videos-widget',
    },
    withProps<{ videos: VideosWidget | null }>({ videos: null })
  );

  readonly user$: Observable<VideosWidget> = this._store$.pipe(
    select((state) => state.videos as VideosWidget),
    filter((videos) => videos !== null)
  );

  get$(): Observable<VideosWidget> {
    return this._http
      .get<{
        headline: string;
        link: string;
      }>(`${environment.backendApiPath}/${environment.userApiPath}`)
      .pipe(
        catchError(() => of({ headline: '', link: '' })),
        tap((videos) => this._store$.update(() => ({ videos: videos })))
      );
  }
}
