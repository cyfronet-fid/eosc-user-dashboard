import { commonEnvironment } from '@environment/environment.common';

export const environment = {
  ...commonEnvironment,
  production: true,
  searchServiceAllUrl: 'https://search.eosc-portal.eu/search/all?q=*',
  betaServiceAllUrl: 'https://search.marketplace.eosc-portal.eu/search/all?q=*',
  betaSearch: 'https://search.marketplace.eosc-portal.eu/',
  betaProviders: 'https://providers.eosc-portal.eu/',
  betaMy: 'https://my.eosc-portal.eu/',
  betaMarketplace: 'https://marketplace.eosc-portal.eu/',
  dislikeEnabled: false,
};
