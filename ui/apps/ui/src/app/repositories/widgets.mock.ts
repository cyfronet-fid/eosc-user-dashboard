import { IWidget } from './widgets.repository.service';

export const widgetsMock: IWidget<unknown>[] = [
  {
    id: 'test1',
    label: 'Recommendation',
    config: { cols: 2, rows: 1, y: 0, x: 0, minItemCols: 2 },
    data: {},
    type: 'recommendations',
  },
  {
    id: 'test2',
    label: 'Recommendation',
    config: { cols: 2, rows: 2, y: 0, x: 2, minItemCols: 2 },
    data: {},
    type: 'feeds',
  },
  {
    id: 'test3',
    label: 'Recommendation',
    config: { cols: 2, rows: 1, y: 0, x: 4, minItemCols: 2 },
    data: {},
    type: 'projects',
  },
];
