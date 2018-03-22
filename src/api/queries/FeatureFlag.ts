import gql from 'graphql-tag';

export const FeatureFlagsQuery = gql`
    query FeatureFlags {
        featureFlags {
            id
            key
            title
        }
    }
`;

export const FeatureFlagAdd = gql`
    mutation FeatureFlagAdd($key: String!, $title: String!) {
        featureFlagAdd(key: $key, title: $title) {
            id
            key
            title
        }
    }
`;