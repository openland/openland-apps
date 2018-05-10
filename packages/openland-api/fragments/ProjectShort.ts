import gql from 'graphql-tag';

export const ProjectShort = gql`
    fragment ProjectShort on BuildingProject {
        id
        slug
        name
        description
        status
        extrasYearEnd
        extrasAddress
        extrasAddressSecondary
        existingUnits
        proposedUnits
        verified
        extrasUrl
        preview: picture(width: 224, height: 164) {
            url
            retina
        }   
    }
`;
