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
import moment from 'moment';

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
    iconPath:
      value?.toLowerCase() === 'open access'
        ? 'assets/open access.svg'
        : 'assets/restricted access.svg',
    additionalClass:
      value?.toLowerCase() === 'open access' ? 'open-access' : 'other-access',
  }));
const DATE_FORMAT = 'DD.MM.YYYY';
export const createDateSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: moment(value).format(DATE_FORMAT) }],
    iconPath: 'assets/calendar.svg',
  }));
export const createTypeSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: `Type: ${value}` }],
    iconPath: 'assets/Group 316.svg',
  }));
export const createViewsSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: `${value} Views` }],
    iconPath: 'assets/views.svg',
  }));
export const createDownloadsSecondaryTag = (
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: `${value} Downloads` }],
    iconPath: 'downloaded.svg',
  }));
export const createKeywordsSecondaryTag = (
  filter: string,
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).length > 0
    ? [
        {
          values: createRedirectTagsOf(filter, values),
          iconPath: 'assets/tag.svg',
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
