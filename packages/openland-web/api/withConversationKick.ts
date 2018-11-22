import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomKickMutation } from 'openland-api';

export const withConversationKick = graphqlMutation(RoomKickMutation, 'kick');