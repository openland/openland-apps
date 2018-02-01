import gql from 'graphql-tag';
import { PermitShort } from './Permits';
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
            latitude
            longitude
        }
        developers {
            id
            slug
            title
            logo
            isDeveloper
            isConstructor
        }
        constructors {
            id
            slug
            title
            logo
            isDeveloper
            isConstructor
        }
        permits {
            ...PermitShort
        }
    }
    ${PermitShort}
`;

export const ProjectQuery = gql`
    query Project($areaId: String!, $projectId: String!) {
        project: project(area: $areaId, slug: $projectId) {
            ...ProjectFull
        }
    }
    ${ProjectFull}
`;

export const ProjectsConnection = gql`
    query ProjectsConnection($areaId: String!, $cursor: String, $page: Int, $minUnits: Int, $year: String, $filter: String) {
        items: projects(area: $areaId, first: 50, minUnits: $minUnits, year: $year, filter: $filter, after: $cursor, page: $page) {
            edges {
                node {
                    ...ProjectShort
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
                openEnded
            }
            stats {
                newUnits
                newUnitsVerified
                totalProjects
                totalProjectsVerified
            }
        }
    }
    ${ProjectShort}
`;