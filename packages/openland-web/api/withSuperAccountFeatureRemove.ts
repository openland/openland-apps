import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FeatureFlags } from 'openland-api';
import { withFeatureFlags } from './withFeatureFlags';

export const withSuperAccountFeatureRemove = graphqlCompose2(
    graphqlMutation(FeatureFlags.FeatureFlagDisableMutation, 'remove', { params: ['accountId'] }),
    withFeatureFlags);