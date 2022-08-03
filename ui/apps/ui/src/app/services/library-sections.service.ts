import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryWidgetsRepositoryService } from '../repositories/library-widgets.repository.service';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ILibrarySection } from '../repositories/library-section.interface';

@Injectable({
  providedIn: 'root',
})
export class LibrarySectionsService {
  constructor(
    private _http: HttpClient,
    private _libraryWidgetsRepository: LibraryWidgetsRepositoryService
  ) {}

  get(): Observable<ILibrarySection[]> {
    return this._http
      .get<ILibrarySection[]>(
        `${environment.backendUrl}/library-widgets/sections`
      )
      .pipe(tap((sections) => this._libraryWidgetsRepository.set(sections)));
  }
}
