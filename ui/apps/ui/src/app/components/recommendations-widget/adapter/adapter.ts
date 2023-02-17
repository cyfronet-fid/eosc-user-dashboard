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
import { capitalize } from 'lodash-es';

const urlAdapter = (
  type: string,
  data: Partial<IOpenAIREResult & IService & ITraining>
) => {
  switch (type) {
    case 'dataset':
    case 'publication':
    case 'software':
    case 'other':
      return `https://explore.eosc-portal.eu/search/result?id=${data?.id
        ?.split('|')
        ?.pop()}`;
    case 'data source':
      return hackDataSourceUrl(data?.pid);
    case 'service':
      return `https://marketplace.eosc-portal.eu/services/${data?.pid}`;
    case 'training':
      return 'https://search.eosc-portal.eu/trainings/' + data.id;
    default:
      return toArray<string>(data.url)[0] ?? '';
  }
};
const SERVICES_AS_DATASOURCES = ['b2share', 'b2find', 'b2safe'];
export const hackDataSourceUrl = (pid?: string) => {
  if (!pid) {
    pid = '';
  }

  if (SERVICES_AS_DATASOURCES.includes(pid)) {
    return `https://marketplace.eosc-portal.eu/services/${pid}`;
  }
  return `https://marketplace.eosc-portal.eu/datasources/${pid}`;
};

export const adapter = (
  data: IOpenAIREResult & ITraining & IService
): IRecommendation => ({
  title: data.title?.join(''),
  image: data.image?.join(''),
  description: data.description?.join(''),
  url: urlAdapter(data.type, data),
  publicationDate: data?.publication_date || '',
  tags: [],
  accessTag: [
    ...createRedirectTagsOf('type', data.type),
    ...createRedirectTagsOf('license', data.license),
    ...createAccessRightSecondaryTag(data.best_access_right),
  ],
  secondaryTags: [
    ...createTypeSecondaryTag(capitalize(data.type)),
    ...createRedirectLanguageTagsOf('language', data.language),
    ...createDateSecondaryTag(data.publication_date),
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
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: value }],
    iconPath:
      value?.toLowerCase() === 'open access'
        ? 'assets/open access.svg'
        : 'assets/restricted access.svg',
    url: `${environment.searchServiceAllUrl}&fq=${filter}:"${value}"`,
    additionalClass: 'none',
  }));

export const createRedirectLanguageTagsOf = (
  filter: string,
  values: unknown | unknown[]
): ISecondaryTag[] =>
  toArray<string>(values).map((value) => ({
    values: [{ label: value }],
    iconPath:
      value?.toLowerCase() === 'open access'
        ? 'assets/open access.svg'
        : 'assets/restricted access.svg',
    url: `${environment.searchServiceAllUrl}&fq=${filter}:"${value}"`,
    additionalClass: 'none',
  }));

export const createRedirectTagsOfITag = (
  filter: string,
  values: unknown | unknown[]
): ITag[] =>
  toArray<string>(values).map((value) => ({
    label: value,
    url: `${environment.searchServiceAllUrl}&fq=${filter}:"${value}"`,
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
          values: createRedirectTagsOfITag(filter, values),
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
          values: createRedirectTagsOfITag(filter, values),
          label,
        },
      ]
    : [];
