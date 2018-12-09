import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { DebugMailsMutation } from 'openland-api';

export const withDebugMails = graphqlMutation(DebugMailsMutation, 'sendMail');
