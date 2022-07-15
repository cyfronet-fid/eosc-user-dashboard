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
        width: calc(100vw - 15px);
        height: 100vh;
      }
    `,
  ],
})
export class DashboardPageComponent {}
