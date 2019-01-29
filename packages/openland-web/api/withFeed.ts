import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FeedHomeQuery } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FeedPostMutation } from 'openland-api';

export const withCreatePost = graphqlMutation(FeedPostMutation, 'post', {
    refetchQueries: [FeedHomeQuery],
});

export const withFeed = graphqlRouted(FeedHomeQuery);
