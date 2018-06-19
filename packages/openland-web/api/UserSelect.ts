import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { User } from 'openland-api';

export const UserSelect = graphqlSelect(User.UsersQuery);