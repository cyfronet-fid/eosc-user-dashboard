import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecommendationType } from '@components/recommendations-widget/types';

export interface IType {
  label: string;
  value: IRecommendationType;
}

@Component({
  selector: 'ui-navbar',
  template: ` <div class="types">
    <a
      *ngFor="let type of types"
      [class.active]="activeValue === type.value"
      href="javascript:void(0)"
      routerLink="."
      [queryParams]="{ recommendationType: type.value }"
      class="type"
      (click)="newType.emit(type.value)"
      >{{ type.label }}</a
    >
  </div>`,
})
export class NavbarComponent {
  @Input()
  activeValue!: IRecommendationType;

  @Output()
  newType = new EventEmitter<IRecommendationType>();
  types: IType[] = [
    {
      label: 'Show all',
      value: 'all',
    },
    {
      label: 'Publications',
      value: 'publication',
    },
    {
      label: 'Data',
      value: 'dataset',
    },
    {
      label: 'Software',
      value: 'software',
    },
    {
      label: 'Services',
      value: 'service',
    },
    {
      label: 'News',
      value: 'news',
    },
    {
      label: 'Data source',
      value: 'data-source',
    },
    {
      label: 'Trainings',
      value: 'training',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];
}
