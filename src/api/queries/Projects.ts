import gql from 'graphql-tag';
import { PermitShort } from './Permits';
import { OrganizationShort } from './Organizations';
import { GeoShort } from './Geo';
import { ProjectShort as PS } from './ProjectShort';

export const ProjectShort = PS;
export const ProjectPreview = gql`
    fragment ProjectPreview on BuildingProject {
        id
        slug
        name
        approvalTime
        preview: picture(width: 310, height: 181) {
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

export const ProjectsSFConnection = gql`
    query ProjectsSFConnection($cursor: String, $page: Int, $minUnits: Int, $year: String, $filter: String) {
        items: projects(area: "sf", first: 50, minUnits: $minUnits, year: $year, filter: $filter, after: $cursor, page: $page) {
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