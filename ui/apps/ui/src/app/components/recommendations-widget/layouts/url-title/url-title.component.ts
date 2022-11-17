import { Component, Input } from '@angular/core';
import { truncate } from 'lodash-es';

@Component({
  selector: 'ui-url-title',
  template: `<h6>
    <a *ngIf="url; else onlyTitleRef" [attr.href]="url" target="_blank">
      <b>{{ shortTitle }}</b>
    </a>
    <ng-template #onlyTitleRef
      ><b>{{ shortTitle }}</b></ng-template
    >
  </h6>`,
  styles: [],
})
export class UrlTitleComponent {
  shortTitle = '';

  @Input()
  set title(title: string) {
    this.shortTitle = truncate(title, { length: 100 });
  }

  @Input()
  url: string | null = null;
}
