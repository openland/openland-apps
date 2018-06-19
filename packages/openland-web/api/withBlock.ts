import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withBlock = graphqlRouted(Parcels.BlockQuery, { params: ['blockId'] });