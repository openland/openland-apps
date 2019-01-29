import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { MyOrganizationsQuery } from 'openland-api';

export const withMyOrganizations = graphqlRouted(MyOrganizationsQuery);
