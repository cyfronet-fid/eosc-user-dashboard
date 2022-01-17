import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IUserActivityResponse} from "./user-activity.model";

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  static URL = `${environment.apiUrlBase}/${environment.apiV1Path}/user_activities`;
  constructor(private _http: HttpClient) {}

  get(): Observable<IUserActivityResponse[]> {
    return this._http.get<IUserActivityResponse[]>(UserActivityService.URL, { withCredentials: true });
  }
}
