import { UserShort } from './../fragments/UserShort';
import gql from 'graphql-tag';

//
// Cards
//

export const MyCardsQuery = gql`
    query MyCards {
        myCards {
            id
            pmid
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

export const RemoveCardMutation = gql`
    mutation RemoveCard($id: ID!) {
        cardRemove(id: $id) {
            id
            deleted
        }
    }
`;

export const MakeCardDefaultMutation = gql`
    mutation MakeCardDefault($id: ID!) {
        cardMakeDefault(id: $id) {
            id
            isDefault
        }
    }
`;

//
// Payments Workflow
//

export const CreateDepositIntentMutation = gql`
    mutation CreateDepositIntent($cardId: ID!, $amount: Int!, $retryKey: String!) {
        cardDepositIntent(id: $cardId, amount: $amount, retryKey: $retryKey) {
            id
            clientSecret
        }
    }
`;

export const PaymentIntentCommitMutation = gql`
    mutation PaymentIntentCommit($id: ID!) {
        paymentIntentCommit(id: $id)
    }
`;

export const PaymentIntentCancelMutation = gql`
    mutation PaymentIntentCancel($id: ID!) {
        paymentCancel(id: $id)
    }
`;

export const DonateMutation = gql`
    mutation Donate($id: ID!) {
        donateToUser(id: $id, amount: 100)
    }
`;

//
// Wallet
//

export const WalletTransactionFragment = gql`
    fragment WalletTransactionFragment on WalletTransaction {
        id
        status
        operation {
            ... on WalletTransactionDeposit {
                amount
                payment {
                    id
                    status
                    intent {
                        id
                        clientSecret
                    }
                }
            }
            ... on WalletTransactionSubscription {
                amount
                payment {
                    id
                    status
                    intent {
                        id
                        clientSecret
                    }
                }
            }
            ... on WalletTransactionTransferOut {
                walletAmount
                chargeAmount
                payment {
                    id
                    status
                    intent {
                        id
                        clientSecret
                    }
                }
                toUser {
                    ...UserShort
                }
            }
            ... on WalletTransactionTransferIn {
                amount
                fromUser {
                    ...UserShort
                }
            }
        }
    }
`;

export const MyWalletQuery = gql`
    query MyWallet {
        myWallet {
            id
            balance
            state
        }
        transactionsPending {
            ...WalletTransactionFragment
        }
        transactionsHistory(first: 20) {
            items {
                ...WalletTransactionFragment
            }
            cursor
        }
    }
    ${WalletTransactionFragment}
`;

export const WalletUpdateFragment = gql`
    fragment WalletUpdateFragment on WalletUpdate {
        ... on WalletUpdateBalance {
            amount
        }
        ... on WalletUpdateTransactionSuccess {
            transaction {
                ...WalletTransactionFragment
            }
        }
        ... on WalletUpdateTransactionCanceled {
            transaction {
                ...WalletTransactionFragment
            }
        }
        ... on WalletUpdateTransactionPending {
            transaction {
                ...WalletTransactionFragment
            }
        }
        ... on WalletUpdatePaymentStatus  {
            payment {
                id
                status
                intent {
                    id
                    clientSecret
                }
            }
        }
    }
`;

export const WalletUpdatesSubscription = gql`
    subscription WalletUpdates($state: String!) {
        event: walletUpdates(fromState: $state) {
            ... on WalletUpdateSingle {
                state
                update {
                    ...WalletUpdateFragment
                }
            }
            ... on WalletUpdateBatch {
                state
                updates {
                    ...WalletUpdateFragment
                }
            }
        }
    }
    ${WalletUpdateFragment}
    ${WalletTransactionFragment}
`;