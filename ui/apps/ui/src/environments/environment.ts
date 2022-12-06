// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { commonEnvironment } from '@environment/environment.common';

export const environment = {
  ...commonEnvironment,
  production: false,
  searchServiceAllUrl:
    'https://eosc-search-service.grid.cyfronet.pl/search/all?q=*',
};
