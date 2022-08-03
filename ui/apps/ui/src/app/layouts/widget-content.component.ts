import { Component, Input } from '@angular/core';
import { LATEST_NEWS_WIDGET } from './widget-content.utils';

@Component({
  selector: 'ui-widget-content',
  template: `
    <ng-container [ngSwitch]="lib">
      <ng-container *ngSwitchCase="LATEST_NEWS_WIDGET">
        <ui-feeds [feeds]="$any(data)"></ui-feeds>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class WidgetContentComponent {
  LATEST_NEWS_WIDGET = LATEST_NEWS_WIDGET;

  @Input()
  lib!: number;

  @Input()
  data: unknown | unknown[] = null;
}
