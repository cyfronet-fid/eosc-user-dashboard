import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  updateEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { LibraryWidgetsRepositoryService } from './library-widgets.repository.service';
import { GridsterItem } from 'angular-gridster2';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { widgetsMock } from './widgets.mock';

export interface IWidget<T> {
  id: string;
  config: Partial<GridsterItem>;
  label: string;
  data: T;
  type: string;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WidgetsRepositoryService {
  readonly _store = createStore(
    {
      name: 'dashboard',
    },
    withEntities<IWidget<unknown>>(),
    withActiveId()
  );
  readonly get$ = this._store.pipe(selectAllEntities());

  constructor(
    private _libraryWidgetsRepository: LibraryWidgetsRepositoryService
  ) {
    this._libraryWidgetsRepository.getNewWidgets$
      .pipe(untilDestroyed(this))
      .subscribe((widget) => this.add(widget));

    // TODO: Remove
    this.add(...widgetsMock);
  }

  add = (...widgets: IWidget<unknown>[]) =>
    this._store.update(addEntities(widgets));
  remove = (...widgets: Partial<IWidget<unknown>> & { id: string }[]) =>
    this._store.update(deleteEntities(widgets.map(({ id }) => id)));
  update = (id: string, widget: Partial<IWidget<unknown>>) =>
    this._store.update(updateEntities(id, widget));
}
