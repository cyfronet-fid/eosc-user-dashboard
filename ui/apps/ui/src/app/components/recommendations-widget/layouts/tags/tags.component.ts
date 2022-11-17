import { Component, Input } from '@angular/core';
import { ITag } from '@components/recommendations-widget/types';

@Component({
  selector: 'ui-tags',
  template: `<div *ngIf="tags.length > 0" class="tags">
    <a *ngFor="let tag of tags" [href]="tag.url ?? ''">{{ tag.label }}</a>
  </div>`,
  styles: [],
})
export class TagsComponent {
  @Input()
  tags: ITag[] = [];
}
