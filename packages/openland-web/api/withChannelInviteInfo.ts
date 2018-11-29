import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { RoomInviteInfoQuery } from 'openland-api';

export const withChannelInviteInfo = graphqlRouted(RoomInviteInfoQuery, {
    params: ['invite'],
});
