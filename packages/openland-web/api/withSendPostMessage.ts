import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SendPostMessageMutation } from 'openland-api';

export const withSendPostMessage = graphqlMutation(SendPostMessageMutation, 'sendPost');