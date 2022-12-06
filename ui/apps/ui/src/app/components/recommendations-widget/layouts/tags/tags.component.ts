import { Component, Input } from '@angular/core';
import { ITag } from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-tags',
  template: `<div *ngIf="tags.length > 0" class="tags">
    <a *ngFor="let tag of tags" [href]="tag.url ?? ''" class="tag">{{
      tag.label
    }}</a>
  </div>`,
  styles: [
    `
      .tags {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 24px;
      }

      .tag {
        padding: 2px 8px;
        background: #edf4ff;
        border-radius: 35px;
        font-size: 14px;
        line-height: 20px;
        color: #2255a4;
      }
    `,
  ],
})
export class TagsComponent {
  @Input()
  tags: ITag[] = [];
}
