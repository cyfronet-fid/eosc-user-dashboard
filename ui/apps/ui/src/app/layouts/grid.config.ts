import {
  CompactType,
  DisplayGrid,
  GridType,
  GridsterConfig,
} from 'angular-gridster2';

// See more about configuration at https://tiberiuzuld.github.io/angular-gridster2/
export const gridConfig: GridsterConfig = {
  gridType: GridType.ScrollVertical,
  displayGrid: DisplayGrid.Always,
  compactType: CompactType.None,
  pushItems: true,
  draggable: {
    enabled: false,
  },
  resizable: {
    enabled: false,
  },
  minCols: 1,
  maxCols: 1,
};
