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

export const FeatureFlagAddMutation = gql`
    mutation FeatureFlagAdd($key: String!, $title: String!) {
        featureFlagAdd(key: $key, title: $title) {
            id
            key
            title
        }
    }
`;

export const FeatureFlagEnableMutation = gql`
    mutation FeatureFlagEnable($accountId: ID!, $featureId: ID!) {
        superAccountFeatureAdd(id: $accountId, featureId: $featureId) {
            id
            features {
                id
                key
                title
            }
        }
    }
`;

export const FeatureFlagDisableMutation = gql`
    mutation FeatureFlagDisable($accountId: ID!, $featureId: ID!) {
        superAccountFeatureRemove(id: $accountId, featureId: $featureId) {
            id
            features {
                id
                key
                title
            }
        }
    }
`;