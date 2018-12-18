import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import {
    ReplyMessageMutation,
    SaveDraftMessageMutation,
    GetDraftMessageQuery,
    RoomEditMessageMutation,
} from 'openland-api';

export const withReplyMessage = graphqlMutation(ReplyMessageMutation, 'replyMessage');
export const withEditMessage = graphqlMutation(RoomEditMessageMutation, 'editMessage');
export const withSaveDraftMessage = graphqlMutation(SaveDraftMessageMutation, 'saveDraft');
export const withGetDraftMessage = graphqlRouted(GetDraftMessageQuery, {
    fetchPolicy: 'network-only',
});

export const withMessageState = graphqlCompose3(
    withReplyMessage,
    withEditMessage,
    withSaveDraftMessage,
);
