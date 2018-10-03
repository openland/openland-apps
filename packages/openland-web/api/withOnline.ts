import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OnlineQuery } from 'openland-api/OnlineQuery';

export const withOnline = graphqlRouted(OnlineQuery, { params: ['userId'], fetchPolicy: 'network-only' });