import gql from 'graphql-tag';
import { graphqlList } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Organization } from './Organizations';
import { Picture } from './Picture';
import { Geo } from './Geo';
import { Permit } from './Permits';

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

export const withBuildingProjectQuery = graphqlRouted<{ project: BuildingProject }>(BuildingProjectQuery, ['projectId']);