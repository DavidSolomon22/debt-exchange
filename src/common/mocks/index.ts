import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PaginateResult } from 'mongoose';

export const createEmptyPaginatedResultMock = <T extends unknown>(): DeepMocked<
  PaginateResult<T>
> => {
  return createMock<PaginateResult<T>>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 20,
    page: 1,
    pagingCounter: 1,
    totalDocs: 0,
    totalPages: 1,
  });
};
