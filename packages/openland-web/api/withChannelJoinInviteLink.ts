import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomJoinInviteLinkMutation } from 'openland-api';

export const withChannelJoinInviteLink = graphqlMutation(RoomJoinInviteLinkMutation, 'join');