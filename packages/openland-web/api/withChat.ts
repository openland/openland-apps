import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatQuery } from 'openland-api/ChatQuery';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SendMessageMutation } from 'openland-api/SendMessageMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';

const withSendMessage = graphqlMutation(SendMessageMutation, 'sendMessage', {
    params: ['conversationId'],
    refetchParams: ['conversationId'],
    refetchQueries: [ChatQuery]
});
const withChatContent = graphqlRouted(ChatQuery, { params: ['conversationId'] });
export const withChat = graphqlCompose2(withSendMessage, withChatContent);