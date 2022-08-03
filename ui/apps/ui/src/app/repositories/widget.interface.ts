import { GridsterItem } from 'angular-gridster2';

export interface IWidget<T> {
  id: number;
  libId: number;
  config: Partial<GridsterItem>;
  label: string;
  data: T;
}
