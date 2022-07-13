import { Component } from '@angular/core';

@Component({
  selector: 'ui-root',
  template: `
    <ui-main-header></ui-main-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
