import { Component, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  template: `
    <div>
      <!--div class="rounded widget mb-3">
          <ui-project-widget></ui-project-widget>
      </div-->
      <div class="rounded widget" id="container">
        <ui-recommendations-widget></ui-recommendations-widget>
      </div>
    </div>
  `,
  styles: [
    `
      .rounded {
        border-radius: 16px !important;
      }
      .widget {
        background-color: white;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardResultsComponent {}
