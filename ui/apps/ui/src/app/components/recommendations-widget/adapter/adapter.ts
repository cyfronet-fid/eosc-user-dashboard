import { IOpenAIREResult } from '@components/recommendations-widget/adapter/openair.model';
import { IService } from '@components/recommendations-widget/adapter/service.model';
import { ITraining } from '@components/recommendations-widget/adapter/training.model';
import {
  IRecommendation,
  ISecondaryTag,
  ITag,
  ITertiaryTag,
} from '@components/recommendations-widget/types';
import { environment } from '@environment/environment';
import { toArray } from '@components/recommendations-widget/utils';

export const adapter = (
  data: IOpenAIREResult & ITraining & IService
): IRecommendation => ({
  title: data.title?.join(''),
  description: data.description?.join(''),
  url: '',
  tags: [
    ...createRedirectTagsOf('type', data.type),
    ...createRedirectTagsOf('license', data.license),
    ...createRedirectTagsOf('language', data.language),
  ],
  secondaryTags: [
    ...createAccessRightSecondaryTag(data.best_access_right),
    ...createDateSecondaryTag(data.publication_date),
    ...createTypeSecondaryTag(data.document_type),
    ...createTypeSecondaryTag(data.resource_type),
    ...createViewsSecondaryTag(data.usage_counts_views),
    ...createDownloadsSecondaryTag(data.usage_counts_downloads),
    ...createKeywordsSecondaryTag('keywords', data.keywords),
    ...createKeywordsSecondaryTag('tag_list', data.tag_list),
  ],
  tertiaryTags: [
    ...createTertiaryTagOf('Publisher', 'publisher', data.publisher),
    ...createTertiaryTagOf('Author names', 'author_names', data.author_names),
    ...createTertiaryTagOf('Field of science', 'fos', data.fos),
  ],
});

export const createRedirectTagsOf = (
  filter: string,
  values: unknown | unknown[]
): ITag[] =>
  toArray<string>(values).map((value) => ({
    label: value,
    url: `${environment.searchServiceAllUrl}&fq=${filter}:("${value}")`,
  }));

export const createAccessRightSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: value }],
    iconPath: '',
    additionalClass:
      value?.toLowerCase() === 'open access' ? 'open-access' : 'other-access',
  }));
export const createDateSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: value }],
    iconPath: '',
  }));
export const createTypeSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: value }],
    iconPath: '',
  }));
export const createViewsSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: `${value} Views` }],
    iconPath: '',
  }));
export const createDownloadsSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: `${value} Downloads` }],
    iconPath: '',
  }));
export const createKeywordsSecondaryTag = (
  filter: string,
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).length > 0
    ? [
        {
          values: createRedirectTagsOf(filter, values),
          iconPath: '',
        },
      ]
    : [];
export const createTertiaryTagOf = (
  label: string,
  filter: string,
  values: unknown | unknown[]
): ITertiaryTag[] =>
  toArray<string>(values).length > 0
    ? [
        {
          values: createRedirectTagsOf(filter, values),
          label,
        },
      ]
    : [];
