import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelJoinMutation, ChatInfoQuery } from 'openland-api';

export const withChannelJoin = graphqlMutation(ChannelJoinMutation, 'join', { refetchQueries: [ChatInfoQuery] });