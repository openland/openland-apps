import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { BlockUserMutation, UnBlockUserMutation } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';

export const withBlockUser = graphqlCompose2(
    graphqlMutation(BlockUserMutation, 'block', {refetchQueries: [ChatInfoQuery]}),
    graphqlMutation(UnBlockUserMutation, 'unblock', {refetchQueries: [ChatInfoQuery]})
);