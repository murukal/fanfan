import {gql, TypedDocumentNode} from '@apollo/client';
import {TimeRangeInput} from '../typings';
import {Category} from '../typings/category';

/**
 * gql片段
 * 定义通用字段
 */
const CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    id
    icon
    name
  }
`;

/**
 * 查询分类列表
 */
export const CATEGORIES: TypedDocumentNode<{
  categories: {
    items: Category[];
  };
}> = gql`
  ${CATEGORY_FIELDS}
  query Categories {
    categories {
      items {
        ...CategoryFields
      }
    }
  }
`;

/**
 * 查询分类列表（携带总支出）
 */
export const CATEGORY_STATISTICS: TypedDocumentNode<
  {
    categories: {
      items: Category[];
    };
  },
  {
    timeRangeInput: TimeRangeInput;
  }
> = gql`
  ${CATEGORY_FIELDS}
  query CategoryStatistics($timeRangeInput: TimeRangeInput!) {
    categories {
      items {
        ...CategoryFields
        totalExpense(timeRangeInput: $timeRangeInput)
      }
    }
  }
`;
