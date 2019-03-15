import gql from 'graphql-tag';

export const OrganizationMedium = gql`
    fragment OrganizationMedium on Organization {
        id
        name
        photo

        isMine
        isOwner: betaIsOwner
        isAdmin: betaIsAdmin
        isCommunity: alphaIsCommunity
    }
`;