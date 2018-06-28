import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';

export const PermissionsQuery = gql`
    query Permissions {
        permissions {
            roles
        }
    }
`;

export const SuperAdminsQuery = gql`
    query SuperAdmins {
        superAdmins {
            role
            user {
                ...UserShort
            }
            email
        }
    }
    ${UserShort}
`;

export const SuperAccountsQuery = gql`
    query SuperAccounts {
        superAccounts {
            id
            title
            state
        }
    }
`;

export const SuperAccountQuery = gql`
    query SuperAccount($accountId: ID!) {
        superAccount(id: $accountId) {
            id
            title
            state
            members {
                ...UserShort
            }
            features {
                id
                key
                title
            }
        }
    }
    ${UserShort}
`;

export const SuperAccountRenameMutation = gql`
    mutation SuperAccountRename($accountId: ID!, $title: String!) {
        superAccountRename(id: $accountId, title: $title) {
            id
            title
        }
    }
`;

export const SuperAccountActivateMutation = gql`
    mutation SuperAccountActivate($accountId: ID!) {
        superAccountActivate(id: $accountId) {
            id
            state
        }
    }
`;

export const SuperAccountSuspendMutation = gql`
    mutation SuperAccountSuspend($accountId: ID!) {
        superAccountSuspend(id: $accountId) {
            id
            state
        }
    }
`;

export const SuperAccountAddMutation = gql`
    mutation SuperAccountAdd($title: String!) {
        superAccountAdd(title: $title) {
            id
        }
    }
`;

export const SuperAccountMemberAddMutation = gql`
    mutation SuperAccountMemberAdd($accountId: ID!, $userId: ID!) {
        superAccountMemberAdd(id: $accountId, userId: $userId) {
            id
            members {
                ...UserShort
            }
        }
    }
    ${UserShort}
`;

export const SuperAccountMemberRemoveMutation = gql`
    mutation SuperAccountMemberRemove($accountId: ID!, $userId: ID!) {
        superAccountMemberRemove(id: $accountId, userId: $userId) {
            id
            members {
                ...UserShort
            }
        }
    }
    ${UserShort}
`;

export const SuperAdminAddMutation = gql`
    mutation SuperAdminAdd($userId: ID!, $role: SuperAdminRole!) {
        superAdminAdd(userId: $userId, role: $role)
    }
`;

export const SuperAdminRemoveMutation = gql`
    mutation SuperAdminRemove($userId: ID!) {
        superAdminRemove(userId: $userId)
    }
`;