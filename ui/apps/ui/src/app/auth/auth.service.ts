import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login() {
    window.location.href =
      `${environment.backendUrl}/${environment.webApiPath}` + '/auth/request';
  }

  getUserInfo$() {
    const url = `${environment.backendUrl}/${environment.webApiPath}/auth/userinfo`;
    return this._http.get(url);
  }

  logout() {
    const url = `${environment.backendUrl}/${environment.webApiPath}/auth/logout`;
    return this._http.post(url, {});
  }
}
