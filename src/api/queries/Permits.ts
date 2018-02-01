import gql from 'graphql-tag';

export const PermitShort = gql`
    fragment PermitShort on Permit {
        id
        createdAt
        status
        statusUpdatedAt
        type
        typeWood
        description
        approvalTime
        proposedUnits
        existingUnits
        streetNumbers {
            streetId
            streetName
            streetNameSuffix
            streetNumber
            streetNumberSuffix
        }
    }
`;