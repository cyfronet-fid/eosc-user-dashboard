import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <app-main-header></app-main-header>
    <div class="container-xxl">
      <div id="ab-view-btn">
        <input
          class="form-check-input"
          type="checkbox"
          [(ngModel)]="isBView"
          id="flexCheckDefault"
          (change)="changeTemplate()"
        >
        <label class="form-check-label" for="flexCheckDefault">
          &nbsp;&nbsp;Show <strong>{{ isBView ? "A" : "B" }}</strong> view template
        </label>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  isBView = false

  constructor(private _router: Router) {}

  async changeTemplate() {
    await this._router.navigateByUrl(this.isBView ? "b-view" : "")
  }
}
