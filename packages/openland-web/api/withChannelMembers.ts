import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChannelMembersQuery } from 'openland-api';

export const withChannelMembers = graphqlRouted(ChannelMembersQuery);