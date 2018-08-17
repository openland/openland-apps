import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';

export const withOrganization = graphqlRouted(OrganizationQuery, { params: ['organizationId'] });