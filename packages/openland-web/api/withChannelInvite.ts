import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAddMemberMutation } from 'openland-api';

export const withChannelInvite = graphqlMutation(RoomAddMemberMutation, 'invite');