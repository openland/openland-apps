import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChatEditMessageMutation } from 'openland-api';

export const withEditMessage = graphqlMutation(ChatEditMessageMutation, 'editMessage');