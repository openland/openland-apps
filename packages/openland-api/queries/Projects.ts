import gql from 'graphql-tag';
import { ProjectShort } from '../fragments/ProjectShort';
import { ProjectFull } from '../fragments/ProjectFull';

export const ProjectQuery = gql`
    query Project($areaId: String!, $projectId: String!) {
        project: project(area: $areaId, slug: $projectId) {
            ...ProjectFull
        }
    }
    ${ProjectFull}
`;

export const ProjectsConnectionQuery = gql`
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

export const ProjectsSFConnectionQuery = gql`
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

export const ProjectSFQuery = gql`
    query ProjectSF($projectId: String!) {
        project: project(area: "sf", slug: $projectId) {
            ...ProjectFull
        }
    }
    ${ProjectFull}
`;
