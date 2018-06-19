import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FeatureFlagsQuery } from 'openland-api/FeatureFlagsQuery';

export const withFeatureFlags = graphqlRouted(FeatureFlagsQuery);