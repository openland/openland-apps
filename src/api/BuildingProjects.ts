import gql from 'graphql-tag';
import { graphqlList } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Organization } from './Organizations';
import { Picture } from './Picture';
import { Geo } from './Geo';
import { Permit } from './Permits';
import { Chart } from './Chart';

const BuildingProjectsStatsQuery = gql`
    query buildingProjectStats($areaId: String!) {
        area(slug: $areaId) {
            id
            slug
            stats {
                totalProjects
                totalProjectsVerified
                totalDevelopers
                totalConstructors
                totalOrganizations
                totalPermits
                year2017NewUnits
                year2017NewUnitsVerified
                year2018NewUnits
                year2018NewUnitsVerified

                fastestApprovalProject {
                    id
                    slug
                    name
                    approvalTime
                    preview: picture(width: 310, height: 181) {
                        url
                        retina
                    }
                }
                slowestApprovalProject {
                    id
                    slug
                    name
                    approvalTime
                    preview: picture(width: 310, height: 181) {
                        url
                        retina
                    }
                }
            }
        }
        permitsUnitsFiledStats: permitsUnitsFiledStats {
            labels
            datasets {
                label
                values
            }
        }
        permitsUnitsIssuedStats: permitsUnitsIssuedStats {
            labels
            datasets {
                label
                values
            }   
        }
        permitsUnitsCompletedStats: permitsUnitsCompletedStats {
            labels
            datasets {
                label
                values
            }   
        }
    }
`;
export interface AreaStats {
    totalProjects: number;
    totalProjectsVerified: number;
    totalDevelopers: number;
    totalConstructors: number;
    totalPermits: number;
    totalOrganizations: number;
    year2017NewUnits: number;
    year2017NewUnitsVerified: number;
    year2018NewUnits: number;
    year2018NewUnitsVerified: number;
    fastestApprovalProject: BuildingShortProject;
    slowestApprovalProject: BuildingShortProject;
}

export interface BuildingShortProject {
    id: string;
    slug: string;
    name: string;
    preview?: Picture;
    approvalTime: number;
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
    constructors?: Organization[];
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
            }
            constructors {
                id
                slug
                title
                logo
            }
            permits {
                id
                createdAt
                status
                statusUpdatedAt
                type
                typeWood
                description
                approvalTime
                streetNumbers {
                    streetId
                    streetName
                    streetNameSuffix
                    streetNumber
                    streetNumberSuffix
                }
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
                        logo
                    }
                    constructors {
                        id
                        slug
                        title
                        logo
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
`;

export const withBuildingProjectsQuery = graphqlList<BuildingProject, BuildingProjectsQueryStats>(
    BuildingProjectsQuery,
    ['cursor', 'minUnits', { key: 'year', default: '2018' }, 'filter']);
export const withBuildingProjectsStats = graphqlRouted<{
    area: { slug: string, stats: AreaStats },
    permitsUnitsFiledStats: Chart,
    permitsUnitsIssuedStats: Chart,
    permitsUnitsCompletedStats: Chart
}>(BuildingProjectsStatsQuery, []);

export const withBuildingProjectQuery = graphqlRouted<{ project: BuildingProject }>(BuildingProjectQuery, ['projectId']);