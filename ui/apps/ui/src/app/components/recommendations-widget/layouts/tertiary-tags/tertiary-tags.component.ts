import { Component, Input } from '@angular/core';
import { ITertiaryTag } from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-tertiary-tags',
  template: `
    <div id="tags">
      <ng-container *ngFor="let tag of tags">
        <div class="tag-row" *ngIf="tag.values.length > 0">
          <span class="tag tag-title">{{ tag.label }}: </span>
          <ng-container *ngFor="let value of tag.values">
            <span class="tag"
              ><a [attr.href]="value.url" target="_blank">{{ value.label }}</a
              >&nbsp;&nbsp;</span
            >
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class TertiaryTagsComponent {
  @Input()
  tags: ITertiaryTag[] = [];
}
