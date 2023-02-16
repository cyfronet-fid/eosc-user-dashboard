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
    <ui-description [description]="description"></ui-description>
    <ui-tertiary-tags [tags]="tertiaryTags"></ui-tertiary-tags>
  </div>`,
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
