import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomMembersQuery, RoomMembersShortQuery } from 'openland-api';
export const withRoomMembers = graphqlRouted(RoomMembersQuery);
export const withRoomMembersId = graphqlRouted(RoomMembersShortQuery, {
    params: ['page', 'query'],
    fetchPolicy: 'network-only',
});
