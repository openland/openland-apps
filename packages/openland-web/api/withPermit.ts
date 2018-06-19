import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { PermitQuery } from 'openland-api/PermitQuery';

export const withPermit = graphqlRouted(PermitQuery, { params: ['permitId'] });