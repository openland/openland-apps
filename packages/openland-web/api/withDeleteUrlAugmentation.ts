import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ChatDeleteUrlAugmentationMutation } from 'openland-api';

export const withDeleteUrlAugmentation = graphqlMutation(ChatDeleteUrlAugmentationMutation, 'deleteUrlAugmentation');