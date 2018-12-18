import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomLeaveMutation } from 'openland-api';

export const withChatLeave = graphqlMutation(RoomLeaveMutation, 'leaveFromChat');
