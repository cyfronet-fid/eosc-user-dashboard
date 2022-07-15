import { DisplayGrid, GridType, GridsterConfig } from 'angular-gridster2';

// See more about configuration at https://tiberiuzuld.github.io/angular-gridster2/
export const gridConfig: GridsterConfig = {
  gridType: GridType.Fit,
  displayGrid: DisplayGrid.Always,
  pushItems: true,
  draggable: {
    enabled: true,
  },
  resizable: {
    enabled: true,
  },
  compactType: 'none',
  minCols: 6,
  maxCols: 6,
};
