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