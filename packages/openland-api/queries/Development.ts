import gql from 'graphql-tag';

export const PersonalTokensQuery = gql`
    query PersonalTokens {
        devPersonalTokens {
            id
            token
            createdAt
        }
    }
`;