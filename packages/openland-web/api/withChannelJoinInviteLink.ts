import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChatInfoQuery } from 'openland-api';
import { ChannelJoinInviteLinkMutation } from 'openland-api';

export const withChannelJoinInviteLink = graphqlMutation(ChannelJoinInviteLinkMutation, 'join', { refetchQueries: [ChatInfoQuery] });