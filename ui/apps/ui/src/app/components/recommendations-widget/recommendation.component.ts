import { Component, Input } from '@angular/core';
import {
  ISecondaryTag,
  ITag,
  ITertiaryTag,
} from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-recommendation',
  template: `<div class="recommendation">
    <ui-tags [tags]="tags" [accesstags]="accessTags"></ui-tags>
    <ui-url-title [title]="title" [url]="url"></ui-url-title>
    <ui-secondary-tags [tags]="secondaryTags"></ui-secondary-tags>
    <ui-tertiary-tags [tags]="tertiaryTags"></ui-tertiary-tags>
    <ui-description [description]="description"></ui-description>
  </div>`,
  styles: [
    `
      .recommendation {
        padding: 24px;
        margin: 24px 0px;
        border: 1px solid #d9dee2;
        border-radius: 8px;
      }
    `,
  ],
})
export class RecommendationComponent {
  @Input()
  title!: string;

  @Input()
  url!: string;

  @Input()
  description!: string;

  @Input()
  tags: ITag[] = [];

  @Input()
  accessTags: ISecondaryTag[] = [];

  @Input()
  secondaryTags: ISecondaryTag[] = [];

  @Input()
  tertiaryTags: ITertiaryTag[] = [];
}
