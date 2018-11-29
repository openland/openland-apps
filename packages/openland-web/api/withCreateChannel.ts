import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomCreateMutation } from 'openland-api';

export const withCreateChannel = graphqlMutation(
    RoomCreateMutation,
    'createChannel',
);
