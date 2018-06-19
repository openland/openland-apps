import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FeatureFlagAddMutation } from 'openland-api/FeatureFlagAddMutation';
import { FeatureFlagsQuery } from 'openland-api/FeatureFlagsQuery';

export const withFeatureFlagAdd = graphqlMutation(FeatureFlagAddMutation, 'add', { refetchQueries: [FeatureFlagsQuery] });