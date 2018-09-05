import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelInviteMutation, ChannelMembersQuery, ChatInfoQuery } from 'openland-api';

export const withChannelInvite = graphqlMutation(ChannelInviteMutation, 'invite', { refetchQueries: [ChannelMembersQuery, ChatInfoQuery] });