import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ConversationSettingsUpdateMutation } from 'openland-api';

export const withConversationSettingsUpdate = graphqlMutation(ConversationSettingsUpdateMutation, 'update');