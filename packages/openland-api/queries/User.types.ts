import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as User from './User';

export const UsersQuery = typedQuery<Types.UsersQuery, Types.UsersQueryVariables>(User.UsersQuery);