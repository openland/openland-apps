import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperChannelAddMemberMutation, ChatInfoQuery } from 'openland-api';

export const withSuperAddToChannel = graphqlMutation(SuperChannelAddMemberMutation, 'add', { refetchQueries: [ChatInfoQuery] });