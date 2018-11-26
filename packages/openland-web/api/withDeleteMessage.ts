import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomDeleteMessageMutation } from 'openland-api';

export const withDeleteMessage = graphqlMutation(RoomDeleteMessageMutation, 'deleteMessage');