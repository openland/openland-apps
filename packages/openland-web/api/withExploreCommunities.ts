import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ExploreComunityQuery } from 'openland-api';

export const withExploreCommunities = graphqlRouted(ExploreComunityQuery, { params: ['page', 'query'], fetchPolicy: 'network-only' });