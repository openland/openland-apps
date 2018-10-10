import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChatLeaveMutation } from 'openland-api';

export const withChatLeave = graphqlMutation(ChatLeaveMutation, 'leaveFromChat');
