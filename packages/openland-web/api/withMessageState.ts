import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import {
    ReplyMessageMutation,
    SaveDraftMessageMutation,
    RoomEditMessageMutation,
} from 'openland-api';

export const withReplyMessage = graphqlMutation(ReplyMessageMutation, 'replyMessage');
export const withEditMessage = graphqlMutation(RoomEditMessageMutation, 'editMessage');
export const withSaveDraftMessage = graphqlMutation(SaveDraftMessageMutation, 'saveDraft');

export const withMessageState = graphqlCompose3(
    withReplyMessage,
    withEditMessage,
    withSaveDraftMessage,
);
