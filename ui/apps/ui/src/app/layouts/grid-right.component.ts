import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { WidgetsRepositoryService } from '../repositories/widgets.repository.service';
import { Observable } from 'rxjs';
import { WidgetsService } from '../services/widgets.service';
import { IWidget } from '../repositories/widget.interface';

@Component({
  selector: 'ui-grid-right',
  template: `
    <div id="container">
      <div
        *ngFor="let widget of widgets$ | async"        
        (itemChange)="itemChange($event)"
      >
        <div class="grid-item-header">
          <span class="grid-item-label"><b>{{ widget.label }}</b></span>

        </div>
        <ui-widget-content
          [lib]="widget.libId"
          [data]="widget.data"
        ></ui-widget-content>
      </div>
    </div>
  `,
  styles: [
    `
    #container {
      height: calc(100vh - 200px);
      background: white;
      border-radius: 20px;
    }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridRightComponent {
  widgets$: Observable<IWidget<unknown>[]> = this._widgetsRepository.get$;

  constructor(
    private _widgetsRepository: WidgetsRepositoryService,
    private _widgetsService: WidgetsService
  ) {}


  itemChange = (t: unknown) => {
    console.log(t);
  };
}
