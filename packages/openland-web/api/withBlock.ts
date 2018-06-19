import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { BlockQuery } from 'openland-api/BlockQuery';

export const withBlock = graphqlRouted(BlockQuery, { params: ['blockId'] });