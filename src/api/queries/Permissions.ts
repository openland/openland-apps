import gql from 'graphql-tag';
import { UserShort } from './User';

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
        }
    }
    ${UserShort}
`;

export const SuperAccountActivate = gql`
    mutation SuperAccountActivate($accountId: ID!) {
        superAccountActivate(id: $accountId) {
            id
            state
        }
    }
`;

export const SuperAccountSuspend = gql`
    mutation SuperAccountSuspend($accountId: ID!) {
        superAccountSuspend(id: $accountId) {
            id
            state
        }
    }
`;

export const SuperAccountMemberAdd = gql`
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

export const SuperAdminAdd = gql`
    mutation SuperAdminAdd($userId: ID!, $role: SuperAdminRole!) {
        superAdminAdd(userId: $userId, role: $role)
    }
`;

export const SuperAdminRemove = gql`
    mutation SuperAdminRemove($userId: ID!) {
        superAdminRemove(userId: $userId)
    }
`;