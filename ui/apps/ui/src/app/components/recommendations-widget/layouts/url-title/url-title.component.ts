import { Component, Input } from '@angular/core';
import { truncate } from 'lodash-es';

const MAX_CHARS_LENGTH = 256;
@Component({
  selector: 'ui-url-title',
  template: `<h5 class="url-title">
    <a *ngIf="url; else onlyTitleRef" [attr.href]="url" target="_blank">
      {{ shortTitle }}
    </a>
    <ng-template #onlyTitleRef
      >{{ shortTitle }}</ng-template
    >
  </h5>`,
})
export class UrlTitleComponent {
  shortTitle = '';

  @Input()
  set title(title: string) {
    this.shortTitle = truncate(title, { length: MAX_CHARS_LENGTH });
  }

  @Input()
  url: string | null = null;
}
