import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import {
    RoomDeleteMessageMutation,
    RoomDeleteMessagesMutation,
} from 'openland-api';

export const withDeleteMessage = graphqlMutation(
    RoomDeleteMessageMutation,
    'deleteMessage',
);
export const withDeleteMessages = graphqlMutation(
    RoomDeleteMessagesMutation,
    'deleteMessages',
);
