import { Component } from '@angular/core';

@Component({
  selector: 'ui-back-to-dashboard-bar',
  template: `
    <div class="ui-back-dashboard-bar">
      <div class="container">
        <div class="eosc-back-link ui-back-link">
          <div class="chevron-left"></div>
          <a [routerLink]="['/dashboard']">Go to Dashboard</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ui-back-dashboard-bar {
        margin-top: -18px;
        height: 60px;
        text-decoration: none;
        font-weight: 100;
        background: #000 url('../../../assets/top-line-bg.jpg') top center;
      }

      .chevron-left {
        background-image: url('../../../assets/ico_back.svg');
        background-size: 10px auto;
        background-position: 0 100%;
        margin: 0 3px 0 0;
        width: 13px;
      }

      .ui-back-link {
        margin-top: 18px;
        padding-top: 17px;
      }
    `,
  ],
})
export class BackToDashboardBarComponent {}
