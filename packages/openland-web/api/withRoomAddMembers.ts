import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAddMemberMutation, RoomAddMembersMutation, RoomMembersShortQuery } from 'openland-api';

export const withRoomAddMember = graphqlMutation(RoomAddMemberMutation, 'addMember');
export const withRoomAddMembers = graphqlMutation(RoomAddMembersMutation, 'addMembers', {
    params: ['roomId', 'invites'],
    refetchParams: ['roomId'],
    refetchQueries: [RoomMembersShortQuery],
});
