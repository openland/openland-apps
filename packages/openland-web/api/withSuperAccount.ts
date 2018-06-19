import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Permissions } from 'openland-api';

export const withSuperAccount = graphqlRouted(Permissions.SuperAccountQuery, { params: ['accountId'] });