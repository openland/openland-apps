import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomUpdateMutation } from 'openland-api';
export const withAlterChat = graphqlMutation(RoomUpdateMutation, 'alter');
