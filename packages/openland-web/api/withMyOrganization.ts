import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Organization } from 'openland-api';

export const withMyOrganization = graphqlRouted(Organization.MyOrganizationQuery);