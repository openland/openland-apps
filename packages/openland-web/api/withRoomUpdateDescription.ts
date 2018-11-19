import { RoomUpdateDescriptionMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withRoomUpdateDescription = graphqlMutation(RoomUpdateDescriptionMutation, 'updateDescription');