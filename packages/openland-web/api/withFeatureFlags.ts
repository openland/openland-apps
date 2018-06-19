import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FeatureFlags } from 'openland-api';

export const withFeatureFlags = graphqlRouted(FeatureFlags.FeatureFlagsQuery);