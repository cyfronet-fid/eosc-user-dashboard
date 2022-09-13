import { Component, OnInit } from '@angular/core';
import { LibrarySectionsService } from '../../services/library-sections.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WidgetsService } from '../../services/widgets.service';

@UntilDestroy()
@Component({
  selector: 'ui-dashboard',
  template: `
    <ui-library></ui-library>
    <div class="container">
      <ui-grid></ui-grid>
    </div>
  `,
  styles: [
    `
      .container {
        display: block;
        width: 100%;
        height: calc(100vh - 36px);
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
