import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChannelSetFeaturedMutation, ChatInfoQuery } from 'openland-api';

export const withChannelSetFeatured = graphqlMutation(ChannelSetFeaturedMutation, 'setFeatured');