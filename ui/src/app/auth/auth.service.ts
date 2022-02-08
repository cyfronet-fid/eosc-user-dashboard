import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  getUserInfo$() {
    const url = `${environment.backendUrl}/${environment.webApiPath}/auth/userinfo`
    return this._http.get(url, { withCredentials: true })
  }

  logout() {
    const url = `${environment.backendUrl}/${environment.webApiPath}/auth/logout`
    return this._http.post(url, {}, { withCredentials: true })
  }
}
