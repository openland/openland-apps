import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAdminsQuery } from 'openland-api/SuperAdminsQuery';

export const withSuperAdmins = graphqlRouted(SuperAdminsQuery);