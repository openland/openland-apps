import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAddMemberMutation } from 'openland-api';

export const withRoomAddMembers = graphqlMutation(RoomAddMemberMutation, 'addMember');