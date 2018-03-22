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

export const FeatureFlagOrganizationAdd = gql`
    mutation FeatureFlagOrganizationAdd($accountId: ID!, $featureId: ID!) {
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

export const FeatureFlagOrganizationRemove = gql`
    mutation FeatureFlagOrganizationRemove($accountId: ID!, $featureId: ID!) {
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