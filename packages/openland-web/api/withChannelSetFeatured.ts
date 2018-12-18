import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAlterFeaturedMutation } from 'openland-api';

export const withChannelSetFeatured = graphqlMutation(RoomAlterFeaturedMutation, 'setFeatured');
