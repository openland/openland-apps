import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withSuperAdmins = graphqlRouted(Queries.Permissions.SuperAdminsQuery);