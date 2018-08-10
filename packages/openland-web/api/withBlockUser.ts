import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { BlockUserMutation, UnBlockUserMutation } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';

export const withBlockUser = graphqlCompose2(
    graphqlMutation(BlockUserMutation, 'block'),
    graphqlMutation(UnBlockUserMutation, 'unblock')
);