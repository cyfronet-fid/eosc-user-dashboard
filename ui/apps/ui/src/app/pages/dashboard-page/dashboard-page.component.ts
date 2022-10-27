import { Component, OnInit } from '@angular/core';
import { LibrarySectionsService } from '../../services/library-sections.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WidgetsService } from '../../services/widgets.service';

@UntilDestroy()
@Component({
  selector: 'ui-dashboard',
  template: `
    <!--ui-library></ui-library-->
    <div id="background">
      <div class="row">
        <div class="col-8 ps-5 pe-2 pt-4 pb-4">
          <div class="rounded" id="container">
            <ui-grid>
            </ui-grid>
          </div>
        </div>
        <div class="col-4 ps-2 pe-5 pt-4 pb-4">
          <div class="rounded" id="container">
            <ui-grid-right>
            </ui-grid-right>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #container {
        height: calc(100vh - 200px);
      }
      #background {
        background-color: #EEF1F3;
      }
      .rounded {
        border-radius: 20px!important;
      }
    `,
  ],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private _librarySections: LibrarySectionsService,
    private _widgets: WidgetsService
  ) {}

  ngOnInit() {
    this._librarySections.get().pipe(untilDestroyed(this)).subscribe();
    this._widgets.get().pipe(untilDestroyed(this)).subscribe();
  }
}
