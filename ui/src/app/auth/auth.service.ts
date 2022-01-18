import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  logout() {
    const url = "http://localhost:8000/api/v1/auth/logout"
    return this._http.post(url, {}, { withCredentials: true })
  }
}
