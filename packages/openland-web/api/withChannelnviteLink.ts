
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChannelInviteLinkQuery, ChannelRenewInviteLinkMutation } from 'openland-api';

export const withChannelnviteLink = graphqlCompose2(
    graphqlRouted(ChannelInviteLinkQuery),
    graphqlMutation(ChannelRenewInviteLinkMutation, 'renew', { refetchQueries: [ChannelInviteLinkQuery] })
);