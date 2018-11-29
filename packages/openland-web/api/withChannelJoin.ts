import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomJoinMutation } from 'openland-api';

export const withChannelJoin = graphqlMutation(RoomJoinMutation, 'join');
