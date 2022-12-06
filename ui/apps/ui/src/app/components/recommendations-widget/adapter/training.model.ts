import { ICommonDataModel } from '@components/recommendations-widget/types';

export interface ITraining extends ICommonDataModel {
  author_names: string;
  language: string;
  keywords: string;
  license: string;
  best_access_right: string;
  resource_type: string;
  content_type: string;
  URL_s: string;
  eosc_provider: string;
  format: string;
  level_of_expertise: string;
  target_group: string;
  qualification: string;
  duration: string;
  type: string;
  usage_counts_views: string;
  usage_counts_downloads: string;
}
