import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-root',
  template: `
    <ui-main-header></ui-main-header>
    <div class="container-xxl">
      <div id="ab-view-btn">
        <input
          class="form-check-input"
          type="checkbox"
          [(ngModel)]="isBView"
          id="flexCheckDefault"
          (change)="changeTemplate()"
        />
        <label class="form-check-label" for="flexCheckDefault">
          &nbsp;&nbsp;Show <strong>{{ isBView ? 'A' : 'B' }}</strong> view
          template
        </label>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  isBView = false;

  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.events.subscribe(() => {
      this.isBView = this._router.url.includes('b-view');
    });
  }

  async changeTemplate() {
    await this._router.navigateByUrl(this.isBView ? 'b-view' : '');
  }
}
