import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomSettingsUpdateMutation } from 'openland-api';

export const withConversationSettingsUpdate = graphqlMutation(RoomSettingsUpdateMutation, 'update');