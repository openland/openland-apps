import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { UsersQuery } from 'openland-api';

export const UserSelect = graphqlSelect(UsersQuery);