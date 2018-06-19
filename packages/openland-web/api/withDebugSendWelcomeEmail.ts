import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { DebugSendWelcomeEmailMutation } from 'openland-api/DebugSendWelcomeEmailMutation';

export const withDebugSendWelcomeEmail = graphqlMutation(DebugSendWelcomeEmailMutation, 'sendWelcome');