import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withBlocks = graphqlRouted(Parcels.BlocksConnectionQuery, { params: ['page'] });