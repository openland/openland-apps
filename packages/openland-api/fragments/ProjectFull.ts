import gql from 'graphql-tag';
import { PermitShort } from '../queries/Permits';
import { OrganizationShort } from './OrganizationShort';
import { GeoShort } from './GeoShort';

export const ProjectFull = gql`
    fragment ProjectFull on BuildingProject {
        id
        slug
        name
        description
        status
        startedAt
        completedAt
        expectedCompletedAt
        verified
        existingUnits
        proposedUnits
        existingAffordableUnits
        proposedAffordableUnits

        preview: picture(width: 800, height: 384) {
            url
            retina
        }
        extrasDeveloper
        extrasGeneralConstructor
        extrasYearEnd
        extrasAddress
        extrasAddressSecondary
        extrasPermit
        extrasComment
        extrasUrl
        extrasLocation {
            ...GeoShort
        }
        developers {
            ...OrganizationShort
        }
        constructors {
            ...OrganizationShort
        }
        permits {
            ...PermitShort
        }
    }
    ${PermitShort}
    ${OrganizationShort}
    ${GeoShort}
`;