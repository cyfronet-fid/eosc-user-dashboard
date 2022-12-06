import { commonEnvironment } from '@environment/environment.common';

export const environment = {
  ...commonEnvironment,
  production: true,
  searchServiceAllUrl: 'https://search.eosc-portal.eu/search/all?q=*',
};
