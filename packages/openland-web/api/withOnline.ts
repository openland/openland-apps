import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OnlineQuery } from 'openland-api';

export const withOnline = graphqlRouted(OnlineQuery, {
    params: ['userId'],
    fetchPolicy: 'network-only',
});
