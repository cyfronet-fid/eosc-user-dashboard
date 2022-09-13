import { Component, Input } from '@angular/core';
import {
  DATASET_RECOMMENDATIONS_WIDGET,
  FAVOURITES_WIDGET,
  LATEST_NEWS_WIDGET,
  PUBLICATION_RECOMMENDATIONS_WIDGET,
  SERVICES_RECOMMENDATIONS_WIDGET,
  SOFTWARE_RECOMMENDATIONS_WIDGET,
  TRAINING_RECOMMENDATIONS_WIDGET,
} from './widget-content.utils';

@Component({
  selector: 'ui-widget-content',
  template: `
    <div class="box">
      <ng-container [ngSwitch]="lib">
        <ng-container *ngSwitchCase="LATEST_NEWS_WIDGET">
          <ui-feeds [feeds]="$any(data)"></ui-feeds>
        </ng-container>
        <ng-container *ngSwitchCase="FAVOURITES_WIDGET">
          <ui-favourites [favourites]="$any(data)"></ui-favourites>
        </ng-container>
        <ng-container *ngSwitchCase="SERVICES_RECOMMENDATIONS_WIDGET">
          <ui-recommendations [resources]="$any(data)"></ui-recommendations>
        </ng-container>
        <ng-container *ngSwitchCase="TRAINING_RECOMMENDATIONS_WIDGET">
          <ui-recommendations [resources]="$any(data)"></ui-recommendations>
        </ng-container>
        <ng-container *ngSwitchCase="PUBLICATION_RECOMMENDATIONS_WIDGET">
          <ui-recommendations [resources]="$any(data)"></ui-recommendations>
        </ng-container>
        <ng-container *ngSwitchCase="DATASET_RECOMMENDATIONS_WIDGET">
          <ui-recommendations [resources]="$any(data)"></ui-recommendations>
        </ng-container>
        <ng-container *ngSwitchCase="SOFTWARE_RECOMMENDATIONS_WIDGET">
          <ui-recommendations [resources]="$any(data)"></ui-recommendations>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .box {
        overflow-y: auto;
        max-height: calc(100% - 96px);
        margin: 12px;
        max-width: 100%;
      }
    `,
  ],
})
export class WidgetContentComponent {
  LATEST_NEWS_WIDGET = LATEST_NEWS_WIDGET;
  FAVOURITES_WIDGET = FAVOURITES_WIDGET;
  SERVICES_RECOMMENDATIONS_WIDGET = SERVICES_RECOMMENDATIONS_WIDGET;
  TRAINING_RECOMMENDATIONS_WIDGET = TRAINING_RECOMMENDATIONS_WIDGET;
  PUBLICATION_RECOMMENDATIONS_WIDGET = PUBLICATION_RECOMMENDATIONS_WIDGET;
  DATASET_RECOMMENDATIONS_WIDGET = DATASET_RECOMMENDATIONS_WIDGET;
  SOFTWARE_RECOMMENDATIONS_WIDGET = SOFTWARE_RECOMMENDATIONS_WIDGET;

  @Input()
  lib!: number;

  @Input()
  data: unknown | unknown[] = null;
}
