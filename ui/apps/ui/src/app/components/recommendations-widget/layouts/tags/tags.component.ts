import { Component, Input } from '@angular/core';
import { ISecondaryTag, ITag } from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-tags',
  template: `
    <!--div *ngIf="tags.length > 0" class="tags">
      <a *ngFor="let tag of tags" [href]="tag.url ?? ''" class="tag">{{
        tag.label
      }}</a>
    </div-->
    <ng-container *ngFor="let taga of accesstags">
      <ng-container *ngIf="accesstags.length > 0">
          <ng-container *ngFor="let value of taga.values">
            <ng-container *ngIf="value.hasOwnProperty('url'); else information">
              <span class="statistic main-tag">
                <img [src]="taga.iconPath" alt="" />
                <a [attr.href]="value?.url" target="_blank"
                  >{{ value.label }}</a
                >
                </span>
            </ng-container>

            <ng-template #information>
              <ng-container *ngFor="let keyword of taga.values">
                <span class="statistic main-tag {{ keyword.label }}">
                  <img [src]="taga.iconPath" alt="" />
                    {{ keyword.label }}
                </span>
              </ng-container>
            </ng-template>
          </ng-container>

      </ng-container>
    </ng-container>
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
      }
      .tags {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 19px;
      }

      .tag {
        padding: 6px 14px;
        background: #edf4ff;
        border-radius: 35px;
        font-size: 16px;
        line-height: 20px;
        color: #2255a4;
      }
    `,
  ],
})
export class TagsComponent {
  @Input()
  tags: ITag[] = [];

  @Input()
  accesstags: ISecondaryTag[] = [];
}
