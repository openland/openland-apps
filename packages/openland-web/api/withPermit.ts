import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Permits } from 'openland-api';

export const withPermit = graphqlRouted(Permits.PermitQuery, { params: ['permitId'] });