import {
  CompactType,
  DisplayGrid,
  GridType,
  GridsterConfig,
} from 'angular-gridster2';

// See more about configuration at https://tiberiuzuld.github.io/angular-gridster2/
export const gridConfig: GridsterConfig = {
  gridType: GridType.VerticalFixed,
  displayGrid: DisplayGrid.Always,
  compactType: CompactType.None,
  pushItems: true,
  draggable: {
    enabled: true,
  },
  resizable: {
    enabled: true,
  },
  minCols: 10,
  maxCols: 10,
  minRows: 3,
  maxRows: 100,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  enableOccupiedCellDrop: false,
  emptyCellDragMaxCols: 15,
  emptyCellDragMaxRows: 50,
  margin: 5,
  // setGridSize: true,
  fixedRowHeight: 150,
};
