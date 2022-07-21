import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { gridConfig } from '../configs/grid.config';
import {
  IWidget,
  WidgetsRepositoryService,
} from '../repositories/widgets.repository.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-grid',
  template: `
    <gridster [options]="gridConfig">
      <gridster-item
        [item]="$any(widget.config)"
        *ngFor="let widget of widgets$ | async"
      >
        <div class="grid-item-header">
          <span class="grid-item-label"
            ><b>{{ widget.label }}</b></span
          >
          <div class="extras">
            <div class="icon">
              <img src="assets/pen-solid.svg" alt="..." />
            </div>
            <div
              class="icon"
              (mousedown)="remove($event, widget)"
              (touchstart)="remove($event, widget)"
            >
              <img src="assets/trash-solid.svg" alt="..." />
            </div>
          </div>
        </div>
      </gridster-item>
    </gridster>
  `,
  styles: [
    `
      /* Grid item */
      .grid-item-label {
        display: inline-block;
        padding: 12px;
      }
      .extras {
        float: right;
      }
      .icon {
        position: relative;
        width: 48px;
        height: 48px;
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 5px;
        display: inline-block;
      }
      .icon img {
        position: absolute;
        width: 14px;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%);
        -ms-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
      }

      /* Gridster general */
      gridster {
        background: white;
      }
      gridster-item {
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 5px;
      }
      gridster-item.gridster-item-resizing,
      gridster-item.gridster-item-moving {
        -webkit-box-shadow: 1px 1px 14px -5px rgba(66, 68, 90, 1);
        -moz-box-shadow: 1px 1px 14px -5px rgba(66, 68, 90, 1);
        box-shadow: 1px 1px 14px -5px rgba(66, 68, 90, 1);
      }
      gridster ::ng-deep gridster-preview {
        background: rgba(0, 0, 0, 0.02) !important;
      }

      gridster ::ng-deep .gridster-column,
      gridster ::ng-deep .gridster-row {
        border-color: rgba(0, 0, 0, 0.02) !important;
      }
      [draggable] {
        user-select: none;
        cursor: pointer;
      }
      router-outlet + * {
        width: 100%;
        overflow: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  gridConfig: GridsterConfig = gridConfig;
  widgets$: Observable<IWidget<unknown>[]> = this._widgetsRepository.get$;

  constructor(private _widgetsRepository: WidgetsRepositoryService) {}

  remove<T>($event: MouseEvent | TouchEvent, widget: IWidget<T>): void {
    $event.preventDefault();
    $event.stopPropagation();
    this._widgetsRepository.remove(widget);
  }
}
