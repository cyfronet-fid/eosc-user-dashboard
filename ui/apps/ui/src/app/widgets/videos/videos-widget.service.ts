/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { VideoDetail } from './videos-widget.types';
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
    withProps<{ videos: VideoDetail[] }>({ videos: [] })
  );

  readonly videos$: Observable<VideoDetail[]> = this._store$.pipe(
    select((state) => state.videos as VideoDetail[]),
    filter((videos) => videos !== null)
  );

  get$(): Observable<VideoDetail[]> {
    return this._http
      .get<[VideoDetail]>(
        `${environment.backendApiPath}/${environment.videoApiPath}/yt`
      )
      .pipe(
        catchError(() =>
          of([
            {
              id: 'No Video',
              title: 'No Video',
              description: '',
              thumbnailUrl: '',
              videoUrl: '',
            },
          ])
        ),
        map((response: any) => {
          return response['items'].map(
            (item: {
              id: { videoId: any };
              snippet: {
                title: any;
                description: any;
                thumbnails: { high: { url: any } };
              };
            }) => {
              return new VideoDetail({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.high.url,
              });
            }
          );
        }),
        tap((videos) => this._store$.update(() => ({ videos: videos })))
      );
  }
}
