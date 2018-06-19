import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Permits } from 'openland-api';

export const withPermits = graphqlRouted(Permits.PermitsConnectionQuery, {
    params: ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']
});