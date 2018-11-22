import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomKickMutation, RoomQuery } from 'openland-api';

export const withConversationKick = graphqlMutation(RoomKickMutation, 'kick', {refetchQueries: [RoomQuery]});