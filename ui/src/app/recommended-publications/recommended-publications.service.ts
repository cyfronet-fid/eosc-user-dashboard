import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IRecommendedPublication} from "./recommended-publication.model";

@Injectable({
  providedIn: 'root'
})
export class RecommendedPublicationsService {
  static URL = `${environment.backendUrl}/${environment.webApiPath}/recommended_publications`;
  constructor(private _http: HttpClient) {}

  get(): Observable<IRecommendedPublication[]> {
    return this._http.get<IRecommendedPublication[]>(RecommendedPublicationsService.URL);
  }
}
