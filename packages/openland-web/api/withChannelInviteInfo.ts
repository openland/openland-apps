import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelInviteMutation, ChannelMembersQuery } from 'openland-api';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChannelInviteInfoQuery } from 'openland-api';

export const withChannelInviteInfo = graphqlRouted(ChannelInviteInfoQuery, { params: ['uuid'] });