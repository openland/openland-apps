
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelInviteMembersMutation } from 'openland-api/queries/Chats';
import { ChannelJoinInviteMutation } from 'openland-api';

export const withChannelJoinInvite = graphqlMutation(ChannelJoinInviteMutation, 'createPublicInvite');