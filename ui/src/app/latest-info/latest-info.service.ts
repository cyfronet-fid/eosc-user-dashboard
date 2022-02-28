import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ILatestInfo} from "./latest-info.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LatestInfoService {
  static URL = `${environment.backendUrl}/${environment.webApiPath}/latest_info`;
  constructor(private _http: HttpClient) {}

  get(): Observable<ILatestInfo[]> {
    return this._http.get<ILatestInfo[]>(LatestInfoService.URL);
  }
}
