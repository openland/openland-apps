import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';

export const PermissionsQuery = gql`
    query Permissions {
        myPermissions {
            roles
        }
    }
`;

export const DebugMailsMutation = gql`
    mutation DebugMails($type: DebugEmailType!) {
        debugSendEmail(type: $type)
    }
`

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
            orgId
            title
            state
            createdAt
        }
    }
`;

export const SuperAccountQuery = gql`
    query SuperAccount($accountId: ID!, $viaOrgId: Boolean) {
        superAccount(id: $accountId, viaOrgId: $viaOrgId) {
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
            orgId
            createdAt
            createdBy {
                id
                name
            }
            published: alphaPublished
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

export const SuperAccountPendMutation = gql`
    mutation SuperAccountPend($accountId: ID!) {
        superAccountPend(id: $accountId) {
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

export const DebugEventsWatchSubscription = gql`
    subscription DebugEventsWatch($fromState: String, $eventsCount: Int!, $randomDelays: Boolean!, $seed: String!) {
        debugEvents(fromState: $fromState, eventsCount: $eventsCount, randomDelays: $randomDelays, seed: $seed) {
            seq
            key
        }
    }
`;