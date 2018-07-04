import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ExploreOrganizationsQuery } from 'openland-api/ExploreOrganizationsQuery';

export const withExploreOrganizations = graphqlRouted(ExploreOrganizationsQuery, { params: ['page', 'query'] });