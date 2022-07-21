import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  addEntities,
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { IWidget } from './widgets.repository.service';
import { filter, map, shareReplay } from 'rxjs';
import * as uuid from 'uuid';
import { libraryWidgetsConfig } from '../configs/library-widgets.config';

export interface ILibraryWidget<T> {
  id: string;
  imageSrc: string;
  label: string;
  isActive: boolean;
  config: Partial<IWidget<T>>;
}

@Injectable({
  providedIn: 'root',
})
export class LibraryWidgetsRepositoryService {
  readonly _store = createStore(
    {
      name: 'library',
    },
    withEntities<ILibraryWidget<unknown>>(),
    withActiveId()
  );
  readonly get$ = this._store.pipe(selectAllEntities());
  readonly getNewWidgets$ = this._store.pipe(
    selectActiveEntity(),
    filter((widget) => !!widget),
    map((widget) => widget as ILibraryWidget<unknown>),
    map(({ config }) => ({ id: uuid.v4(), ...config } as IWidget<unknown>)),
    shareReplay(1)
  );

  constructor() {
    this._store.update(addEntities(libraryWidgetsConfig));
  }

  setActive = (widget: Partial<ILibraryWidget<unknown>> & { id: string }) => {
    this._store.update(setActiveId(widget.id));
    this._store.update(setActiveId(undefined));
  };
}
