import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { FeatureFlagsQuery } from 'openland-api';

export const withFeatureFlags = graphqlRouted(FeatureFlagsQuery);
