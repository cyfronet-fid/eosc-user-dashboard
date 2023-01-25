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
  styles: [
    `
      .types {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 30px;
      }

      .type {
        padding: 2px 10px;
        color: #3d4db6;
        border-radius: 35px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #3d4db6;
      }

      .active {
        color: white !important;
        background: #3d4db6;
      }
    `,
  ],
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
