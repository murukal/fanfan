import {gql, TypedDocumentNode} from '@apollo/client';
import {PaginateOutput} from '../typings';
import {User} from '../typings/auth';

export const USERS: TypedDocumentNode<{
  users: PaginateOutput<User>;
}> = gql`
  query Users {
    users {
      items {
        id
        avatar
        username
        email
      }
    }
  }
`;
