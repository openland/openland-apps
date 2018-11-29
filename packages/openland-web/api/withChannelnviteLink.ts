import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomInviteLinkQuery, RoomRenewInviteLinkMutation } from 'openland-api';

export const withChannelnviteLink = graphqlCompose2(
    graphqlRouted(RoomInviteLinkQuery),
    graphqlMutation(RoomRenewInviteLinkMutation, 'renew', {
        refetchQueries: [RoomInviteLinkQuery],
    }),
);
