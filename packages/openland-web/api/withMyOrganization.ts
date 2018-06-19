import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { MyOrganizationQuery } from 'openland-api/MyOrganizationQuery';

export const withMyOrganization = graphqlRouted(MyOrganizationQuery);