import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { withFeatureFlags } from './withFeatureFlags';
import { FeatureFlagDisableMutation } from 'openland-api';

export const withSuperAccountFeatureRemove = graphqlCompose2(
    graphqlMutation(FeatureFlagDisableMutation, 'remove', {
        params: ['accountId'],
    }),
    withFeatureFlags,
);
