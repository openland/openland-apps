import gql from 'graphql-tag';
import { ChartFull } from './Charts';
import { ProjectPreview } from './Projects';

export const AreaStatsQuery = gql`
    query AreaStats($areaId: String!) {
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
                    ...ProjectPreview
                }
                slowestApprovalProject {
                    ...ProjectPreview
                }
            }
        }
        permitsUnitsFiledStats: permitsUnitsFiledStats {
            ...ChartFull
        }
        permitsUnitsIssuedStats: permitsUnitsIssuedStats {
            ...ChartFull
        }
        permitsUnitsCompletedStats: permitsUnitsCompletedStats {
            ...ChartFull
        }
    }
    ${ChartFull}
    ${ProjectPreview}
`;

export const InternalStatsQuery = gql`
    query InternalStats {
        permitsApprovalStats: permitsApprovalStats {
            ...ChartFull
        }
        permitsApprovalUnits: permitsApprovalUnits {
            ...ChartFull
        }
        permitsUnitsFiledStats: permitsUnitsFiledStats {
            ...ChartFull
        }
        permitsUnitsIssuedStats: permitsUnitsIssuedStats {
            ...ChartFull
        }
        permitsUnitsCompletedStats: permitsUnitsCompletedStats {
            ...ChartFull
        }
    }
    ${ChartFull}
`;