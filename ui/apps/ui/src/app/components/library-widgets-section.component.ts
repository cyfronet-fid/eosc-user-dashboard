import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ILibraryWidget} from "../repositories/library-widget.interface";

@Component({
  selector: 'ui-library-widgets-section',
  template: `<div>
    <p>
      <b>{{ label }}</b>
    </p>
    <div class="row gy-2 gx-2">
      <div
        class="col-6"
        *ngFor="let widget of widgets"
        (click)="selectedWidget.emit(widget.id)"
      >
        <ui-library-widget
          [imageSrc]="widget.imageSrc"
          [label]="widget.label"
        ></ui-library-widget>
      </div>
    </div>
    <div style="padding-top: 24px;"></div>
  </div>`,
})
export class LibraryWidgetsSectionComponent {
  @Input()
  label!: string;

  @Input()
  widgets: ILibraryWidget<unknown>[] = [];

  @Output()
  selectedWidget = new EventEmitter<number>();
}
