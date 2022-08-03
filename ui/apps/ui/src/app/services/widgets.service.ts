import { Injectable } from '@angular/core';
import { WidgetsRepositoryService } from '../repositories/widgets.repository.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { IWidget } from '../repositories/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  constructor(
    private _http: HttpClient,
    private _widgetsRepository: WidgetsRepositoryService
  ) {}

  get(): Observable<IWidget<unknown>[]> {
    return this._http
      .get<IWidget<unknown>[]>(`${environment.backendUrl}/widgets`)
      .pipe(tap((widgets) => this._widgetsRepository.set(widgets)));
  }
  create(libId: number): Observable<IWidget<unknown>> {
    return this._http
      .post<IWidget<unknown>>(`${environment.backendUrl}/widgets`, {
        libId,
        config: {},
      })
      .pipe(tap((widget) => this._widgetsRepository.add(widget)));
  }
  delete(id: number): Observable<unknown> {
    return this._http
      .delete(`${environment.backendUrl}/widgets/${id}`)
      .pipe(tap(() => this._widgetsRepository.delete({ id })));
  }
  update<T>(id: number, data: Partial<IWidget<T>>) {
    return this._http
      .put(`${environment.backendUrl}/widgets/${id}`, data)
      .pipe(tap(() => this._widgetsRepository.update(id, data)));
  }
}
