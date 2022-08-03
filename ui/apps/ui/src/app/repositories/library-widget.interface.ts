import { IWidget } from './widget.interface';

export interface ILibraryWidget<T> {
  id: number;
  imageSrc: string;
  label: string;
  config: Partial<IWidget<T>>;
}
