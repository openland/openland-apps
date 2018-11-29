import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomDeleteUrlAugmentationMutation } from 'openland-api';

export const withDeleteUrlAugmentation = graphqlMutation(
    RoomDeleteUrlAugmentationMutation,
    'deleteUrlAugmentation',
);
