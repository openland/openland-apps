import gql from 'graphql-tag';
import { UserFull } from './UserFull';

export const OrganizationMedium = gql`
    fragment OrganizationMedium on Organization {
        id
        name
        photo
        isMine
        membersCount
        isOwner: betaIsOwner
        isAdmin: betaIsAdmin
        isCommunity: alphaIsCommunity
    }
    ${UserFull}
`;
