import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withPermit = graphqlRouted(Queries.Permits.PermitQuery, { params: ['permitId'] });