import gql from 'graphql-tag';
import { UserFull } from './UserFull';

export const OrganizationMedium = gql`
    fragment OrganizationMedium on Organization {
        id
        name
        photo

        isMine
        isOwner: betaIsOwner
        isAdmin: betaIsAdmin
        isCommunity: alphaIsCommunity
        adminMembers: alphaOrganizationAdminMembers {
            role
            user {
                ...UserFull
            }
        }
    }
    ${UserFull}
`;
