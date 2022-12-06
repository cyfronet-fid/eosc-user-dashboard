import { isArray } from 'lodash-es';

export const toArray = <T>(data: unknown): T[] => {
  if (!data) {
    return [];
  }

  console.log(isArray(data) ? (data as T[]) : ([data] as T[]));

  return isArray(data) ? (data as T[]) : ([data] as T[]);
};
