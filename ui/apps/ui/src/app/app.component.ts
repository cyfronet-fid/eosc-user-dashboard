import { Component } from '@angular/core';

@Component({
  selector: 'ui-root',
  template: `
    <ui-main-header></ui-main-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      /* width */
      ::ng-deep ::-webkit-scrollbar {
        width: 8px;
      }

      /* Track */
      ::ng-deep ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
      }

      /* Handle */
      ::ng-deep ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
      }

      /* Handle on hover */
      ::ng-deep ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `,
  ],
})
export class AppComponent {}
