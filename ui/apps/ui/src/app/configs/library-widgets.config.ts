import { ILibraryWidget } from '../repositories/library-widgets.repository.service';

export const libraryWidgetsConfig: ILibraryWidget<unknown>[] = [
  {
    id: 'test-1',
    imageSrc: 'assets/error.png',
    label: 'Projects',
    config: {
      label: 'Recommendation',
      config: { cols: 2, rows: 1, minItemCols: 2 },
      data: {},
      type: 'projects-recommendation',
    },
    isActive: false,
  },
  {
    id: 'test-2',
    imageSrc: 'assets/error.png',
    label: 'Services',
    config: {
      label: 'Recommendation',
      config: { cols: 2, rows: 1, minItemCols: 2 },
      data: {},
      type: 'services-recommendation',
    },
    isActive: false,
  },
  {
    id: 'test-3',
    imageSrc: 'assets/error.png',
    label: 'Feeds',
    config: {
      label: 'Feeds',
      config: { cols: 2, rows: 1, minItemCols: 2 },
      data: {},
      type: 'feeds',
    },
    isActive: false,
  },
];
