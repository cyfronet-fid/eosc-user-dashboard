import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
