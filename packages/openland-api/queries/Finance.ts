import gql from 'graphql-tag';

export const MyCardsQuery = gql`
    query MyCards {
        myCards {
            id
            last4
            brand
            expYear
            expMonth
            isDefault
            deleted
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

export const CreateDepositIntentMutation = gql`
    mutation CreateDepositIntent($cardId: ID!, $amount: Int!, $retryKey: String!) {
        cardDepositIntent(id: $cardId, amount: $amount, retryKey: $retryKey) {
            id
            clientSecret
        }
    }
`;

export const DepositIntentCommitMutation = gql`
    mutation DepositIntentCommit($id: ID!) {
        cardDepositIntentCommit(id: $id)
    }
`;

export const RemoveCardMutation = gql`
    mutation RemoveCard($id: ID!) {
        cardRemove(id: $id) {
            id
            deleted
        }
    }
`;

export const MyWalletQuery = gql`
    query MyWallet {
        myAccount {
            id
            balance
        }
    }
`;

export const WalletTransactionsQuery = gql`
    query WalletTransactions($id: ID!, $first: Int!, $after: String) {
        walletTransactions(id: $id, first: $first, after: $after) {
            items {
                id
                amount
                state
                readableState
            }
            cursor
        }
    }
`;