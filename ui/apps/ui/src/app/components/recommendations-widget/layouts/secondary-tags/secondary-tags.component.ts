import { Component, Input } from '@angular/core';
import { ISecondaryTag } from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-secondary-tags',
  template: `
    <div class="usage">
      <ng-container *ngFor="let tag of tags">
        <ng-container *ngIf="tags.length > 0">
          <span class="statistic text-muted"
            ><img [src]="tag.iconPath" alt="" />&nbsp;
            <ng-container *ngFor="let value of tag.values">
              <ng-container
                *ngIf="value.hasOwnProperty('url'); else information"
              >
                <a [attr.href]="value?.url" target="_blank"
                  >{{ value.label }}&nbsp;&nbsp;&nbsp;</a
                >
              </ng-container>

              <ng-template #information>
                <ng-container *ngFor="let keyword of tag.values"
                  >{{ keyword.label }}&nbsp;&nbsp;</ng-container
                >
              </ng-template>
            </ng-container>
          </span>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .usage {
        margin-bottom: 24px;
      }
      .usage > .statistic {
        font-size: 11px;
        margin-right: 15px;
      }
      .statistic > img {
        margin-right: 2px;
      }
    `,
  ],
})
export class SecondaryTagsComponent {
  @Input()
  tags: ISecondaryTag[] = [];
}
