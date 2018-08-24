
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelJoinInviteMutation } from 'openland-api';

export const withChanneJoinlnviteSIgnin = graphqlMutation(ChannelJoinInviteMutation, 'join', {params: ['invite']});