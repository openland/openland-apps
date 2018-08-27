import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { ChatUpdateGroupMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
export const withAlterChat = graphqlMutation(ChatUpdateGroupMutation, 'alter', { refetchQueries: [ChatInfoQuery], params: ['conversationId'] });