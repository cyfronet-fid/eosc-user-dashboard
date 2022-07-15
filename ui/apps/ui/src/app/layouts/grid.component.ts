import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  DisplayGrid,
  GridType,
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
// See more about configuration at https://tiberiuzuld.github.io/angular-gridster2/
@Component({
  selector: 'ui-grid',
  template: `<gridster [options]="options">
    <gridster-item [item]="item" *ngFor="let item of dashboard">
      <button
        (mousedown)="removeItem($event, item)"
        (touchstart)="removeItem($event, item)"
      >
        delete
      </button>
    </gridster-item>
  </gridster>`,
  styles: [
    `
      /* Dashboard */

      gridster {
        background: white;
        z-index: -1;
      }

      gridster-item {
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 10px;
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
        border-color: rgba(0, 0, 0, 0.01) !important;
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
  options: GridsterConfig = {
    gridType: GridType.Fit,
    displayGrid: DisplayGrid.Always,
    pushItems: true,
    draggable: {
      enabled: true,
    },
    resizable: {
      enabled: true,
    },
  };
  dashboard: GridsterItem[] = [
    { cols: 2, rows: 1, y: 0, x: 0 },
    { cols: 2, rows: 2, y: 0, x: 2 },
    { cols: 1, rows: 1, y: 0, x: 4 },
    { cols: 3, rows: 2, y: 1, x: 4 },
    { cols: 1, rows: 1, y: 4, x: 5 },
    { cols: 1, rows: 1, y: 2, x: 1 },
    { cols: 2, rows: 2, y: 5, x: 5 },
    { cols: 2, rows: 2, y: 3, x: 2 },
    { cols: 2, rows: 1, y: 2, x: 2 },
    { cols: 1, rows: 1, y: 3, x: 4 },
    { cols: 1, rows: 1, y: 0, x: 6 },
  ];

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
}
