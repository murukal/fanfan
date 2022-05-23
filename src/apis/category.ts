import {gql, TypedDocumentNode} from '@apollo/client';
import {Category} from '../typings/category';

export const CATEGORIES: TypedDocumentNode<{
  categories: {
    items: Category[];
  };
}> = gql`
  query {
    categories {
      items {
        id
        icon
        name
      }
    }
  }
`;
