import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { BlocksConnectionQuery } from 'openland-api/BlocksConnectionQuery';

export const withBlocks = graphqlRouted(BlocksConnectionQuery, { params: ['page'] });