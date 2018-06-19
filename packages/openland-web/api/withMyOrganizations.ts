import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { MyOrganizationsQuery } from 'openland-api/MyOrganizationsQuery';

export const withMyOrganizations = graphqlRouted(MyOrganizationsQuery);