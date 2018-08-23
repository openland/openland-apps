
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelInviteMembersMutation } from 'openland-api';

export const withChanneSendlnviteLink = graphqlMutation(ChannelInviteMembersMutation, 'send');