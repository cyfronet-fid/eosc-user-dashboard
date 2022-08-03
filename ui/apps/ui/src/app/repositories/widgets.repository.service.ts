import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  setEntities,
  updateEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { LibraryWidgetsRepositoryService } from './library-widgets.repository.service';
import { IWidget } from './widget.interface';

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
  ) {}

  set = (widgets: IWidget<unknown>[]) =>
    this._store.update(setEntities(widgets));
  add = (...widgets: IWidget<unknown>[]) =>
    this._store.update(addEntities(widgets));
  delete = (...widgets: Partial<IWidget<unknown>> & { id: number }[]) =>
    this._store.update(deleteEntities(widgets.map(({ id }) => id)));
  update = (id: number, data: Partial<IWidget<unknown>>) =>
    this._store.update(updateEntities(id, data));
}
