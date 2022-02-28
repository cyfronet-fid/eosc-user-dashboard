import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUserDataResponse, IUserDetailsResponse} from "./user-data.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  static URL = `${environment.backendUrl}/${environment.webApiPath}/user_data/current`;

  constructor(private _http: HttpClient) {}

  get(): Observable<IUserDataResponse> {
    return this._http.get<IUserDataResponse>(UserDataService.URL);
  }
}
