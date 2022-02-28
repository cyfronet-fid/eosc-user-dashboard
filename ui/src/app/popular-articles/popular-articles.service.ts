import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPopularArticle} from "./popular-articles.model";

@Injectable({
  providedIn: 'root'
})
export class PopularArticlesService {
  static URL = `${environment.backendUrl}/${environment.webApiPath}/popular_articles`;
  constructor(private _http: HttpClient) {}

  get(): Observable<IPopularArticle[]> {
    return this._http.get<IPopularArticle[]>(PopularArticlesService.URL);
  }
}
