/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

interface EoscCommonWindow extends Window {
  eosccommon: {
    renderMainFooter: (cssSelector: string) => void;
    renderMainHeader: (cssSelector: string, elementAttr?: any) => void;
    renderEuInformation: (cssSelector: string) => void;
  };
}
declare let window: EoscCommonWindow;

@Component({
  selector: 'ui-main-header',
  template: `
    <div
      *ngIf="!isLoggedIn"
      id="eosc-common-main-header"
      [attr.data-login-url]="backendUrl + '/auth/request'"
      [attr.data-logout-url]="backendUrl + '/auth/logout'"
      #eoscCommonMainHeader
    ></div>
    <div *ngIf="isLoggedIn">
      <div class="row">
        <div class="col-2 ps-5 pt-4 pb-4">
          LOGO
        </div>
        <div class="col-6 px-2 pt-4 pb-4" align="center">
          SEARCH
        </div>
        <div class="col-2 px-2 pt-4 pb-4" align="center">
          Add Project
        </div>
        <div class="col-2 pe-5 pt-4 pb-4" align="right">
          ICONS
        </div>
      </div>
      <nav class="nav ps-4 pt-4">
        <a class="nav-link" [routerLink]="['/dashboard']" >Feed</a>
        <a class="nav-link" [routerLink]="['/projects']">Projects</a>
        <a class="nav-link disabled">Trainings</a>
        <a class="nav-link disabled">Services</a>
        <a class="nav-link disabled">Orders</a>
        <a class="nav-link disabled">Statistics</a>
        <a class="nav-link disabled">Calendar</a>
        <a class="nav-link disabled">Community</a>
        <a class="nav-link disabled">Favourities</a>
      </nav>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MainHeaderComponent implements OnInit {
  backendUrl = `${environment.backendUrl}`;
  constructor(private _authService: AuthService, private _router: Router) {}
  isLoggedIn = false;

  ngOnInit() {
    this.isActive()
  };

  isActive() { 
    this._authService
    .getUserInfo$()
    .pipe(
      catchError(() => {
        window.eosccommon.renderMainHeader('#eosc-common-main-header');
        this.isLoggedIn = false;
        return of();
      })
    )
    .subscribe((response: any) => {
      const { username } = response;

      this.isLoggedIn = true;
    });

  };
}
