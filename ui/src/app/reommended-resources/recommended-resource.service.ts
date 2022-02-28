import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IRecommendedResource} from "./recommended-resource.model";

@Injectable({
  providedIn: 'root'
})
export class RecommendedResourceService {
  static URL = `${environment.backendUrl}/${environment.webApiPath}/recommended_resources`;

  constructor(private _http: HttpClient) {}

  get(): Observable<IRecommendedResource[]> {
    return this._http.get<IRecommendedResource[]>(RecommendedResourceService.URL);
  }
}
