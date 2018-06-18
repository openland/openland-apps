import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withDebugSendWelcomeEmail = graphqlMutation(Queries.Debug.DebugSendWelcomeEmailMutation, 'sendWelcome');