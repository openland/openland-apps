import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as FeatureFlag from './FeatureFlag';

export const FeatureFlagsQuery = typedQuery<Types.FeatureFlagsQuery, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAddMutation, Types.FeatureFlagAddMutationVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnableMutation, Types.FeatureFlagEnableMutationVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisableMutation, Types.FeatureFlagDisableMutationVariables>(FeatureFlag.FeatureFlagDisableMutation);