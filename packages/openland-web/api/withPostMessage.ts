import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SendPostMessageMutation, EditPostMessageMutation } from 'openland-api';

export const withSendPostMessage = graphqlMutation(SendPostMessageMutation, 'sendPost');
export const withEditPostMessage = graphqlMutation(EditPostMessageMutation, 'editPost');
