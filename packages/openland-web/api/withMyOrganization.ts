import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withMyOrganization = graphqlRouted(Queries.Organization.MyOrganizationQuery);