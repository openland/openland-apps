import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { ReplyMessageMutation, ChatEditMessageMutation } from 'openland-api';

export const withReplyMessage = graphqlMutation(ReplyMessageMutation, 'replyMessage');
export const withEditMessage = graphqlMutation(ChatEditMessageMutation, 'editMessage');
export const withEditAndReplyMessage = graphqlCompose2(withReplyMessage, withEditMessage);