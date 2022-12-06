export interface ITag {
  label: string;
  url?: string;
}

export interface ISecondaryTag {
  values: ITag[];
  iconPath: string;
  additionalClass?: string;
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
  | 'service';

export interface ICommonDataModel {
  id: string;
  title: string[];
  url: string[];
  description: string[];
  publication_date: string;
}

export interface IRecommendation {
  title: string;
  url: string;
  description: string;
  tags: ITag[];
  secondaryTags: ISecondaryTag[];
  tertiaryTags?: ITertiaryTag[];
}
