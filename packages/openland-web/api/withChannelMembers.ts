import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomMembersQuery } from 'openland-api';

export const withChannelMembers = graphqlRouted(RoomMembersQuery);