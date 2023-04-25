// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { commonEnvironment } from '@environment/environment.common';

export const environment = {
  ...commonEnvironment,
  production: false,
  searchServiceAllUrl:
    'https://eosc-search-service.grid.cyfronet.pl/search/all?q=*',
  betaServiceAllUrl:
    'https://beta.search.marketplace.eosc-portal.eu/search/all?q=*',
  betaSearch: 'https://beta.search.marketplace.eosc-portal.eu/',
  betaProviders: 'https://sandbox.providers.eosc-portal.eu/',
  betaMy: 'https://beta.my.eosc-portal.eu/',
  betaMarketplace: 'https://beta.marketplace.eosc-portal.eu/',
};
