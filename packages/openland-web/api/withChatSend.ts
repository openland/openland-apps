import { SendMessageMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
export const withChatSend = graphqlMutation(SendMessageMutation, 'sendMessage');
