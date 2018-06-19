import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAccountQuery } from 'openland-api/SuperAccountQuery';

export const withSuperAccount = graphqlRouted(SuperAccountQuery, { params: ['accountId'] });