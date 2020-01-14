import gql from 'graphql-tag';

export const MyCardsQuery = gql`
    query MyCards {
        myCards {
            id
            last4
            brand
            expYear
            expMonth
        }
    }
`;

export const CreateCardSetupIntentMutation = gql`
    mutation CreateCardSetupIntent($retryKey: String!) {
        cardCreateSetupIntent(retryKey: $retryKey) {
            id
            clientSecret
        }
    }
`;

export const CommitCardSetupIntentMutation = gql`
    mutation CommitCardSetupIntent($id: ID!, $pmid: ID!) {
        cardCommitSetupIntent(id: $id, pmid: $pmid) {
            id
        }
    }
`;