import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import {
  ReplyMessageMutation,
  ChatEditMessageMutation,
  SaveDraftMessageMutation,
  GetDraftMessageQuery
} from 'openland-api';

export const withReplyMessage = graphqlMutation(
  ReplyMessageMutation,
  'replyMessage'
);
export const withEditMessage = graphqlMutation(
  ChatEditMessageMutation,
  'editMessage'
);
export const withSaveDraftMessage = graphqlMutation(
  SaveDraftMessageMutation,
  'saveDraft'
);
export const withGetDraftMessage = graphqlRouted(GetDraftMessageQuery);

export const withMessageState = graphqlCompose3(
  withReplyMessage,
  withEditMessage,
  withSaveDraftMessage
);
