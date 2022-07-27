import { Component, Output } from '@angular/core';
import {
  ILibrarySection,
  LibraryWidgetsRepositoryService,
} from '../repositories/library-widgets.repository.service';
import { Observable } from 'rxjs';
import { WidgetsService } from '../services/widgets.service';

@Component({
  selector: 'ui-library',
  template: ` <div id="menu-btn-overlap" (click)="visible = !visible">
      {{ visible ? '<' : '>' }}
    </div>
    <div id="lib-line-overlap"></div>
    <nz-drawer
      [nzMaskClosable]="false"
      [nzMaskStyle]="{ display: 'none' }"
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
          <div id="lib-widgets" *ngFor="let section of sections$ | async">
            <ui-library-widgets-section
              [label]="section.label"
              [widgets]="section.widgets"
              (selectedWidget)="add($event)"
            ></ui-library-widgets-section>
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
      #lib-line,
      #lib-line-overlap {
        position: fixed;
        height: 100vh;
        border-left: 4px solid lightgray;
        top: 0;
        z-index: 999;
      }
      #lib-line {
        left: 378px;
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
  sections$: Observable<ILibrarySection[]> =
    this._libraryWidgetsRepository.get$;

  constructor(
    private _libraryWidgetsRepository: LibraryWidgetsRepositoryService,
    private _widgetsService: WidgetsService
  ) {}

  add = (id: number) => this._widgetsService.create(id).toPromise();
}
