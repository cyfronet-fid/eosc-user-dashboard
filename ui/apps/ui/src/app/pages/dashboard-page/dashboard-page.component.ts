import { Component } from '@angular/core';

@Component({
  selector: 'ui-dashboard',
  template: `
    <ui-library></ui-library>
    <div id="container">
      <ui-grid></ui-grid>
    </div>
  `,
  styles: [
    `
      #container {
        width: 100vw;
        height: calc(100vh - 36px);
      }
    `,
  ],
})
export class DashboardPageComponent {}
