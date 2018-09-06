import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChatDeleteMessageMutation } from 'openland-api';

export const withDeleteMessage = graphqlMutation(ChatDeleteMessageMutation, 'deleteMessage');