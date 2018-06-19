import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Permissions } from 'openland-api';

export const withSuperAdmins = graphqlRouted(Permissions.SuperAdminsQuery);