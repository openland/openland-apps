import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withBlocks = graphqlRouted(Queries.Parcels.BlocksConnectionQuery, { params: ['page'] });