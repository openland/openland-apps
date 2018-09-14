import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { UserQuery } from 'openland-api/UserQuery';

export const withUser = graphqlRouted(UserQuery, { params: ['userId'] });