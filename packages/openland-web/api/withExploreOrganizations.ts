import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ExploreOrganizationsQuery } from 'openland-api';

export const withExploreOrganizations = graphqlRouted(ExploreOrganizationsQuery, {
    params: ['page', 'query'],
    fetchPolicy: 'network-only',
});
