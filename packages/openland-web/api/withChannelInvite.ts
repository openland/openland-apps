import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelInviteMutation, ChannelMembersQuery } from 'openland-api';

export const withChannelInvite = graphqlMutation(ChannelInviteMutation, 'invite', { refetchQueries: [ChannelMembersQuery] });