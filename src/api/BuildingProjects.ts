import gql from 'graphql-tag';
import { graphqlList } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Organization } from './Organizations';
import { Picture } from './Picture';
import { Geo } from './Geo';
import { Permit } from './Permits';

const BuildingProjectsStatsQuery = gql`
    query buildingProjectStats {
        globalStats: globalStats {
            totalProjects
            totalDevelopers
            totalConstructors
            totalPermits
        }
        stats: buildingProjectsStats {
            projectsTracked
            projectsVerified
            year2017NewUnits
            year2017NewUnitsVerified
            year2018NewUnits
            year2018NewUnitsVerified
            fastestApprovalProject {
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

                preview: picture(width: 224, height: 164) {
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
                }
                permits {
                    id
                    createdAt
                    status
                    type
                    typeWood
                    description
                }
            }
            slowestApprovalProject {
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

                preview: picture(width: 224, height: 164) {
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
                }
                permits {
                    id
                    createdAt
                    status
                    type
                    typeWood
                    description
                }
            }
        }
    }
`;

export interface BuildingProjectsStats {
    projectsTracked: number;
    projectsVerified: number;
    year2017NewUnits: number;
    year2017NewUnitsVerified: number;
    year2018NewUnits: number;
    year2018NewUnitsVerified: number;
    fastestApprovalProject: BuildingProject;
    slowestApprovalProject: BuildingProject;
}

export interface GlobalStats {
    totalProjects: number;
    totalDevelopers: number;
    totalConstructors: number;
    totalPermits: number;
}

export interface BuildingProject {
    id: string;
    slug: string;
    name: string;
    description?: string;
    status?: string;
    startedAt?: string;
    completedAt?: string;
    expectedCompletedAt?: string;
    verified: boolean;

    existingUnits?: number;
    proposedUnits?: number;
    existingAffordableUnits?: number;
    proposedAffordableUnits?: number;

    preview?: Picture;
    extrasDeveloper?: string;
    extrasGeneralConstructor?: string;
    extrasYearEnd?: string;
    extrasAddress?: string;
    extrasAddressSecondary?: string;
    extrasPermit?: string;
    extrasComment?: string;
    extrasUrl?: string;
    extrasLocation?: Geo;

    developers?: Organization[];
    permits?: Permit[];
}

export interface BuildingProjectsQueryStats {
    stats: {
        newUnits: number,
        newUnitsVerified: number,
        totalProjects: number,
        totalProjectsVerified: number
    };
}

const BuildingProjectQuery = gql`
    query buildingProject($projectId: String!) {
        project: buildingProject(slug: $projectId) {
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

            preview: picture(width: 224, height: 164) {
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
            }
            permits {
                id
                createdAt
                status
                type
                typeWood
                description
            }
        }
    }
`;

const BuildingProjectsQuery = gql`
    query buildingProjects($cursor: String, $minUnits: Int, $year: String, $filter: String) {
        items: buildingProjects(first: 50, minUnits: $minUnits, year: $year, filter: $filter, after: $cursor) {
            edges {
                node {
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

                    preview: picture(width: 224, height: 164) {
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
                    }
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
            }
            stats {
                newUnits
                newUnitsVerified
                totalProjects
                totalProjectsVerified
            }
        }
    }
`;

export const withBuildingProjectsQuery = graphqlList<BuildingProject, BuildingProjectsQueryStats>(
    BuildingProjectsQuery,
    ['cursor', 'minUnits', 'year', 'filter']);
export const withBuildingProjectsStats = graphqlRouted<{ stats: BuildingProjectsStats, globalStats: GlobalStats }>(BuildingProjectsStatsQuery, []);

export const withBuildingProjectQuery = graphqlRouted<{ project: BuildingProject }>(BuildingProjectQuery, ['projectId']);