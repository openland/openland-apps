import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withMyOrganizations = graphqlRouted(Queries.Organization.MyOrganizationsQuery);