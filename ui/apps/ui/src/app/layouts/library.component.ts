import { Component, Output } from '@angular/core';
import { ILibraryWidget } from '../components/library-widget.component';

@Component({
  selector: 'ui-library',
  template: `<div id="menu-btn-overlap" (click)="visible = !visible">
      {{ visible ? '<' : '>' }}
    </div>
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="visible"
      nzPlacement="left"
      nzTitle="Libraries"
      (nzOnClose)="visible = false"
    >
      <ng-container *nzDrawerContent>
        <div id="lib-line"></div>
        <div id="menu-btn" (click)="visible = !visible">
          {{ visible ? '<' : '>' }}
        </div>
        <div id="lib-container">
          <div id="lib-widgets">
            <ui-library-widgets-section
              label="Recommendations"
              [widgets]="widgets"
              (selectedWidget)="setActive($event)"
            ></ui-library-widgets-section>
            <ui-library-widgets-section
              label="Others"
              [widgets]="widgets"
            ></ui-library-widgets-section>
          </div>
          <div id="lib-extras">
            <div id="lib-extras-container">
              <button
                nz-button
                nzType="primary"
                (click)="visible = false"
                nzShape="round"
                nzBlock
                [disabled]="activeWidgets.length === 0"
              >
                Add ({{ activeWidgets.length }})
              </button>
            </div>
          </div>
        </div>
      </ng-container>
    </nz-drawer>`,
  styles: [
    `
      ::ng-deep .ant-drawer-body {
        background: rgba(0, 0, 0, 0.02);
      }
      #lib-container {
        position: relative;
        padding-bottom: 50px;
        height: 100%;
      }
      #lib-extras {
        position: absolute;
        bottom: 0;
        width: calc(100% + 48px);
        border-top: 1px solid lightgray;
        margin-left: -24px;
        margin-right: -24px;
      }
      #lib-extras-container {
        padding: 24px 24px 0 24px;
      }
      #lib-line {
        position: fixed;
        height: 100vh;
        left: 378px;
        border-left: 4px solid lightgray;
        top: 0;
      }
      #menu-btn,
      #menu-btn-overlap {
        position: fixed;
        background: lightgray;
        padding: 20px 10px;
        top: 50%;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      #menu-btn {
        left: 378px;
      }
      #menu-btn-overlap {
        left: 0;
        z-index: 999;
      }
    `,
  ],
})
export class LibraryComponent {
  @Output()
  visible = false;
  widgets: ILibraryWidget<unknown>[] = [
    {
      id: 'test-1',
      imageSrc: 'assets/error.png',
      label: 'Projects',
      config: {
        label: 'Recommendation',
        config: { cols: 2, rows: 1, minItemCols: 2 },
        data: {},
      },
      isActive: false,
    },
    {
      id: 'test-2',
      imageSrc: 'assets/error.png',
      label: 'Projects',
      config: {
        label: 'Recommendation',
        config: { cols: 2, rows: 1, minItemCols: 2 },
        data: {},
      },
      isActive: false,
    },
    {
      id: 'test-3',
      imageSrc: 'assets/error.png',
      label: 'Projects',
      config: {
        label: 'Recommendation',
        config: { cols: 2, rows: 1, minItemCols: 2 },
        data: {},
      },
      isActive: false,
    },
  ];
  activeWidgets: string[] = [];

  setActive(id: string) {
    const widget = this.widgets.find(
      ({ id: activeId }) => activeId === id
    ) as ILibraryWidget<unknown>;
    if (this.activeWidgets.includes(id)) {
      this.activeWidgets = this.activeWidgets.filter(
        (activeId) => activeId === id
      );
      widget.isActive = false;
      return;
    }

    widget.isActive = true;
    this.activeWidgets.push(id);
  }
}
