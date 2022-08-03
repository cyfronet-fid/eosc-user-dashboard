import { ILibraryWidget } from './library-widget.interface';

export interface ILibrarySection {
  id: number;
  label: string;
  widgets: ILibraryWidget<unknown>[];
}
