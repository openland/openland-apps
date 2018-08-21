import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { UserChannelsQuery } from 'openland-api';

export const withUserChannels = graphqlRouted(UserChannelsQuery, { fetchPolicy: 'cache-and-network' });