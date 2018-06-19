import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { UsersQuery } from 'openland-api/UsersQuery';

export const UserSelect = graphqlSelect(UsersQuery);