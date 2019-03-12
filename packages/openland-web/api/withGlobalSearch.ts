import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { GlobalSearchQuery } from 'openland-api';

export const withGlobalSearch = graphqlRouted(GlobalSearchQuery, {
    fetchPolicy: 'cache-and-network',
});
