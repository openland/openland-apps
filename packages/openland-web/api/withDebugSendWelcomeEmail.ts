import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Debug } from 'openland-api';

export const withDebugSendWelcomeEmail = graphqlMutation(Debug.DebugSendWelcomeEmailMutation, 'sendWelcome');