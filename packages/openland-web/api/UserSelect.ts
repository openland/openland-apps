import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Queries } from 'openland-api';

export const UserSelect = graphqlSelect(Queries.User.UsersQuery);