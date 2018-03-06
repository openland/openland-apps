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
            ...UserShort
        }
    }
    ${UserShort}
`;

export const SuperAdminAdd = gql`
    mutation SuperAdminAdd($userId: ID!) {
        superAdminAdd(userId: $userId)
    }
`

export const SuperAdminRemove = gql`
    mutation SuperAdminRemove($userId: ID!) {
        superAdminRemove(userId: $userId)
    }
`