import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAdminsQuery } from 'openland-api';

export const withSuperAdmins = graphqlRouted(SuperAdminsQuery);
