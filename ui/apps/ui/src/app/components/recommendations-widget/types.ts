import { IOpenAIREResult } from '@components/recommendations-widget/adapter/openair.model';
import { ITraining } from '@components/recommendations-widget/adapter/training.model';
import { IService } from '@components/recommendations-widget/adapter/service.model';

export interface ITag {
  label: string;
  url?: string;
}

export interface ISecondaryTag {
  values: ITag[];
  iconPath: string;
  additionalClass?: string;
  url?: string;
}

export interface ITertiaryTag {
  label: string;
  values: ITag[];
}

export type IRecommendationType =
  | 'all'
  | 'publication'
  | 'dataset'
  | 'software'
  | 'training'
  | 'service'
  | 'data-source'
  | 'other'
  | 'news';

export interface ICommonDataModel {
  id: string;
  title: string[];
  url: string[];
  description: string[];
  publication_date: string;
}

export interface IRecommendationResponse {
  isRand: boolean;
  message: string;
  recommendations: Array<IOpenAIREResult & ITraining & IService>;
}

export interface IRecommendation {
  id: string;
  type: IValueWithLabel;
  title: string;
  url: string;
  image: string;
  description: string;
  tags: ITag[];
  accessTag: ISecondaryTag[];
  secondaryTags: ISecondaryTag[];
  tertiaryTags?: ITertiaryTag[];
  publicationDate: string;
  visitId: string;
}

export interface IValueWithLabel {
  label: string;
  value: string;
}
