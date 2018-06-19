import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { withFeatureFlags } from './withFeatureFlags';
import { FeatureFlagEnableMutation } from 'openland-api/FeatureFlagEnableMutation';

export const withSuperAccountFeatureAdd = graphqlCompose2(
    graphqlMutation(FeatureFlagEnableMutation, 'add', { params: ['accountId'] }),
    withFeatureFlags);