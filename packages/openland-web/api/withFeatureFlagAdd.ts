import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FeatureFlags } from 'openland-api';

export const withFeatureFlagAdd = graphqlMutation(FeatureFlags.FeatureFlagAddMutation, 'add', { refetchQueries: [FeatureFlags.FeatureFlagsQuery] });