import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { PermitsConnectionQuery } from 'openland-api/PermitsConnectionQuery';

export const withPermits = graphqlRouted(PermitsConnectionQuery, {
    params: ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']
});