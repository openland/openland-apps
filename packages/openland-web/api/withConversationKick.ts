import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ConversationKickMutation, ChannelMembersQuery } from 'openland-api';

export const withConversationKick = graphqlMutation(ConversationKickMutation, 'kick', {refetchQueries: [ChannelMembersQuery]});