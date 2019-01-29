import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAccountQuery } from 'openland-api';

export const withSuperAccount = graphqlRouted(SuperAccountQuery, {
    params: ['accountId'],
});
