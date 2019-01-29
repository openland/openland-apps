import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { UserQuery } from 'openland-api';

export const withUser = graphqlRouted(UserQuery, { params: ['userId'] });
