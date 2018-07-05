import { SendMessageMutation } from 'openland-api/SendMessageMutation';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
export const withChatSend = graphqlMutation(SendMessageMutation, 'sendMessage');