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
        permitsUnitsFiledStats {
            ...ChartFull
        }
        permitsUnitsIssuedStats {
            ...ChartFull
        }
        permitsUnitsCompletedStats {
            ...ChartFull
        }
        permitsUnitsFiledStatsMonthly {
            ...ChartFull
        }
    }
    ${ChartFull}
    ${ProjectPreview}
`;

export const InternalStatsQuery = gql`
    query InternalStats {
        permitsApprovalStats {
            ...ChartFull
        }
        permitsApprovalUnits {
            ...ChartFull
        }
        permitsUnitsFiledStats {
            ...ChartFull
        }
        permitsUnitsIssuedStats {
            ...ChartFull
        }
        permitsUnitsCompletedStats {
            ...ChartFull
        }
        permitsUnitsFiledStatsMonthly {
            ...ChartFull
        }
    }
    ${ChartFull}
`;