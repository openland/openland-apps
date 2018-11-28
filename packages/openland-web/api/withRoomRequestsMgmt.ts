import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAddMemberMutation, RoomDeclineJoinReuestMutation } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';

export const withRoomAddMembers = graphqlMutation(RoomAddMemberMutation, 'accept');
export const withRoomDeclineMembers = graphqlMutation(RoomDeclineJoinReuestMutation, 'decline');
export const withRoomMembersMgmt = graphqlCompose2(withRoomAddMembers, withRoomDeclineMembers);