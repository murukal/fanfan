export interface Core {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginateOutput<T> {
  items?: T[];
  page?: number;
  limit?: number;
  totalCount?: number;
  pageCount?: number;
}

export interface PaginateInput {
  page?: number;
  limit: number;
}

/**
 * 时间范围入参
 */
export interface TimeRangeInput {
  from: Date;
  to: Date;
}
