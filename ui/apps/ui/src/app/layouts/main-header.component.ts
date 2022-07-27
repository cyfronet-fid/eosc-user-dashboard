/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';

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
      id="eosc-common-main-header"
      [attr.data-login-url]="backendUrl + '/auth/request'"
      [attr.data-logout-url]="backendUrl + '/auth/logout'"
      #eoscCommonMainHeader
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MainHeaderComponent implements OnInit {
  backendUrl = `${environment.backendUrl}`;
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService
      .getUserInfo$()
      .pipe(
        catchError(() => {
          window.eosccommon.renderMainHeader('#eosc-common-main-header');
          return of();
        })
      )
      .subscribe((response: any) => {
        const { username } = response;
        window.eosccommon.renderMainHeader('#eosc-common-main-header', {
          username,
        });
      });
  }
}
