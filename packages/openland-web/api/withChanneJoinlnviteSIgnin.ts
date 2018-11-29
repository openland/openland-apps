import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomJoinInviteLinkMutation } from 'openland-api';

export const withChanneJoinlnviteSIgnin = graphqlMutation(
    RoomJoinInviteLinkMutation,
    'join',
    { params: ['invite'] },
);
