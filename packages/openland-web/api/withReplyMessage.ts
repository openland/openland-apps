import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ReplyMessageMutation } from 'openland-api';

export const withReplyMessage = graphqlMutation(ReplyMessageMutation, 'replyMessage');
