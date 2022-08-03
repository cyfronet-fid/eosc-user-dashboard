import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { ILibrarySection } from './library-section.interface';

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
