import { ICommonDataModel } from '@components/recommendations-widget/types';

export interface IOpenAIREResult extends ICommonDataModel {
  url: string[];
  image: string[];
  author_names: string[];
  description: string[];
  best_access_right: string;
  language: string[];
  type: string;
  fos: string[];
  keywords: string[];
  open_access: boolean;
  publisher: string;
  author_pids: string[];
  license: string;
  document_type: string[];
  country: string;
  doi: string[];
  usage_counts_views: string;
  usage_counts_downloads: string;
  visit_id: string;
}
