import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RespondPostMessageMutation } from 'openland-api';

export const withRespondPostMessage = graphqlMutation(
    RespondPostMessageMutation,
    'respondPostMessage',
);
