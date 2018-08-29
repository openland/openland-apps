import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelSetHiddenMutation, ChatInfoQuery } from 'openland-api';

export const withChannelSetHidden = graphqlMutation(ChannelSetHiddenMutation, 'setHidden');