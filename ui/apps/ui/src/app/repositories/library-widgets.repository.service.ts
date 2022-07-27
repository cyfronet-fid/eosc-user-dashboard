import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { IWidget } from './widgets.repository.service';

export interface ILibrarySection {
  id: number;
  label: string;
  widgets: ILibraryWidget<unknown>[];
}
export interface ILibraryWidget<T> {
  id: number;
  imageSrc: string;
  label: string;
  config: Partial<IWidget<T>>;
}

@Injectable({
  providedIn: 'root',
})
export class LibraryWidgetsRepositoryService {
  readonly _store = createStore(
    {
      name: 'library-sections',
    },
    withEntities<ILibrarySection>(),
    withActiveId()
  );
  readonly get$ = this._store.pipe(selectAllEntities());

  set = (sections: ILibrarySection[]) =>
    this._store.update(setEntities(sections));
}
