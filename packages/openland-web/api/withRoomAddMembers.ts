import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAddMemberMutation, RoomAddMembersMutation } from 'openland-api';

export const withRoomAddMember = graphqlMutation(RoomAddMemberMutation, 'addMember');
export const withRoomAddMembers = graphqlMutation(RoomAddMembersMutation, 'addMembers');
