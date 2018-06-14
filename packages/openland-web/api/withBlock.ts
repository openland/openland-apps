import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withBlock = graphqlRouted(Queries.Parcels.BlockQuery, { params: ['blockId'] });