import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IRecommendation,
  IRecommendationResponse,
  IRecommendationType,
} from '@components/recommendations-widget/types';
import { environment } from '@environment/environment';
import { Observable, map } from 'rxjs';
import { adapter } from '@components/recommendations-widget/adapter/adapter';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  constructor(private _http: HttpClient) {}

  public favevent: EventEmitter<null> = new EventEmitter<null>();

  fetch$(type: IRecommendationType): Observable<IRecommendation[]> {
    return this._http
      .get<IRecommendationResponse[]>(
        `${environment.backendApiPath}/${environment.recommendationsApiPath}/${type}`
      )
      .pipe(
        map((recommendations) =>
          recommendations
            .map(({ recommendations }) => recommendations)
            .reduce((acc, recommendations) => [...acc, ...recommendations], [])
            .map((recommendation) => adapter(recommendation))
            .sort(
              (a, b) =>
                new Date(b.publicationDate).getTime() -
                new Date(a.publicationDate).getTime()
            )
        )
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evaluate$(payload: any): Observable<number> {
    return this._http.post<number>(
      `${environment.backendApiPath}/${environment.evaluateApiPath}`,
      payload
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favget$(jwt: string): Observable<any> {
    const tok = 'Bearer ' + jwt;
    const headers = new HttpHeaders()
      .set('Authorization', tok)
      .set('X-Client-Token', jwt);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this._http.get<any>(
      `${environment.backendApiV1Path}/${environment.favApiPath}`,
      { headers: headers }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favadd$(payload: any, types: string, jwt: string): Observable<number> {
    const tok = 'Bearer ' + jwt;
    const headers = new HttpHeaders()
      .set('Authorization', tok)
      .set('X-Client-Token', jwt);
    return this._http.post<number>(
      `${environment.backendApiV1Path}/${environment.favApiPath}/${types}`,
      { body: payload, headers: headers }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favremove$(payload: any, types: string, jwt: string): Observable<any> {
    const tok = 'Bearer ' + jwt;
    const headers = new HttpHeaders()
      .set('Authorization', tok)
      .set('X-Client-Token', jwt);
    return this._http.delete<unknown>(
      `${environment.backendApiV1Path}/${environment.favApiPath}/${types}`,
      { body: payload, headers: headers }
    );
  }

  public emitFavRemove() {
    this.favevent.emit();
  }
}
