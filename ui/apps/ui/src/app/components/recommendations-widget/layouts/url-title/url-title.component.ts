import { Component, Input } from '@angular/core';
import { truncate } from 'lodash-es';

const MAX_CHARS_LENGTH = 256;
@Component({
  selector: 'ui-url-title',
  template: `<h5 class="url-title">
    <a *ngIf="url; else onlyTitleRef" [attr.href]="url" target="_blank">
      <b>{{ shortTitle }}</b>
    </a>
    <ng-template #onlyTitleRef
      ><b>{{ shortTitle }}</b></ng-template
    >
  </h5>`,
  styles: [
    `
      .url-title {
        font-weight: 600 !important;
        size: 22px !important;
        line-height: 28px !important;
        letter-spacing: -0.02em !important;
        color: #333333;
        margin-bottom: 24px;
      }
    `,
  ],
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
