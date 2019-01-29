import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FeatureFlagAddMutation } from 'openland-api';
import { FeatureFlagsQuery } from 'openland-api';

export const withFeatureFlagAdd = graphqlMutation(FeatureFlagAddMutation, 'add', {
    refetchQueries: [FeatureFlagsQuery],
});
